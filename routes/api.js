'use strict';

const querystring = require('querystring');

const express = require('express');

const User = require('../models/usermodel');
const Course = require('../models/coursemodel');

module.exports = function (app, passport) {


    app.get('/users', function (req, res) {
        res.render('users', {
            user: req.user
        });
    });

    app.get('/users/get', function (req, res) {
        User.find(function (err, userList) {
            if (err) {
                res.send(err);
            }
            res.json(userList);
        });
    });

    app.get('/courses/get', function (req, res) {
        Course.find(function (err, courseList) {
            if (err) {
                res.send(err)
            }
            res.json(courseList);
        });
    });

    app.get('/courses/search/(:query*)?',
        function (req, res) {
            var dbQuery = {}; // all documents
            var query = querystring.parse(req.params.query);

            console.log("query: ", query);


            /**
             * Create db query (begin)
             *
             * @see https://docs.mongodb.com/manual/tutorial/query-documents/#query-on-embedded-documents
             * @type {{[card.tags]: {$in: (Array|*)}}}
             */

            if (query.tags) {
                dbQuery["card.tags"] = {
                    "$in": query.tags.split(',')
                };
            }
            /* Create db query (end) */

            console.log("dbQuery: ", dbQuery);

            Course
                .find(dbQuery)
                .limit(query.limit || 0) // 0 — unlimited
                .exec(function (err, courseList) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.json(courseList);
                    }
                });
        });

    app.post('/courses/add', function (req, res) {
        console.log("=== Попытка записи в базу ===");
        let course = new Course(req.body);
        course.save(function (err) {
            if (err) {
                return err;
            } else {
                console.log("=== Запись успешно добавлена ===");
                req.session.sessionFlash = {
                    type: 'flash__success',
                    message: 'Курс успешно добавлен в базу данных.'
                }
                res.redirect('/');
            }
        })
    });
};
