const express = require('express');
const jwt = require('express-jwt');

const authSettings = require('../settings').auth0;
const admins = require('../settings').admins;

const Course = require('../models/coursemodel');

/**
 *
 * @param {object} user
 * @return {boolean}
 */
let isUserAdmin = (user) => {
    let verifyType = user.email ? 'email' : 'nickname';

    return !!admins.find(admin => {
        return user[verifyType] === admin[verifyType];
    });
};

let processResultWith = (req, res) => {
    return (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json(data);
        }
    };
};

let authenticate = (req, res, next) => {
    let jwtCheck = jwt({
        secret: authSettings.secret,
        audience: authSettings.audience
    });

    jwtCheck(req, res, (err, data) => {
        if (err) {
            return res.status(401).json({
                error: err.message
            });
        } else {
            /*
             req.user:
             {
             nickname: 'Alex Baumgertner',
             email: 'alex.baumgertner@gmail.com', // Facebook don't send email
             email_verified: true
             }
             */

            req.user.isAdmin = isUserAdmin(req.user);

            next();
        }
    });
};

module.exports = function(app) {

    /**
     * Read courses (list)
     */
    app.get('/api/courses/', function(req, res) {
        let requestQuery = req.query;
        let page = Number(requestQuery.page) || 1;
        let queryTitle = requestQuery.queryTitle || '';

        let mongoQuery = {
            'card.title': {
                $regex: `.*${queryTitle}.*`,
                $options: 'i' // ignore case
            }
        };

        // Refactor to Promises
        Course.count(mongoQuery, (err, count) => {
            if (err) {
                res.json({ status: 'error', error: err });
                return;
            }

            Course.find(mongoQuery,
                    (err, courses) => {
                        if (err) {
                            res.json({ status: 'error', error: err });
                            return;
                        }

                        res.json({
                            courses: courses,
                            count: count
                        });
                    })
                .skip((page - 1) * 5)
                .limit(10)
        });
    });

    /**
     * Create course
     */
    app.post('/api/courses/', authenticate, function(req, res) {

        console.log("req.user: ", req.user);

        let course = new Course({
            card: req.body,
            author: req.user
        });

        course.save(processResultWith(req, res));
    });

    /**
     * Read course
     */
    app.get('/api/courses/:id', function(req, res) {
        Course
            .findOne({ _id: req.params.id }, processResultWith(req, res));
    });

    /**
     * Edit course
     */
    app.put('/api/courses/:id', authenticate, function(req, res) {
        Course
            .findOneAndUpdate({ _id: req.params.id },
                // update data
                {
                    card: req.body,
                    author: req.user
                },
                processResultWith(req, res)
            );

    });

    /**
     * Delete course
     */
    app.delete('/api/courses/:id', authenticate, function(req, res) {
        if (!req.user) {
            return res.status(401).json({
                status: 'You are not authenticated. Please visit /login.'
            });
        }

        if (req.user.isAdmin) {
            Course
                .findByIdAndRemove(
                    req.params.id,
                    // delete data
                    (data) => {
                        res.json({
                            status: 'success',
                            data: data
                        });
                    });
        } else {
            return res.status(401).json({
                status: 'You are not admin'
            });
        }

    });
};