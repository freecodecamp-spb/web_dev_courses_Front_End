const express = require('express');
const jwt = require('express-jwt');

const authSettings = require('../settings/auth').auth0;

const Course = require('../models/coursemodel');

module.exports = function(app) {
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
      secret: new Buffer(authSettings.secret, 'base64'),
      audience: authSettings.audience
    });

    jwtCheck(req, res, (err, data) => {
      if (err) {
        return res.status(401).json({
          error: err.message
        });
      } else {
        next();
      }
    });
  };

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
        res.json({status: 'error', error: err});
        return;
      }

      Course.find(mongoQuery,
        (err, courses) => {
          if (err) {
            res.json({status: 'error', error: err});
            return;
          }

          res.json({
            courses: courses,
            count: count
          });
        })
            .limit(10)
            .skip((page - 1) * 10)
            .sort({"card.queryTitle": 1});
    });
  });

  app.post('/api/courses/', function(req, res) {
    let course = new Course({
      card: req.body
    });

    course.save(processResultWith(req, res));
  });

  app.get('/api/courses/:id', function(req, res) {
    Course
    .findOne({_id: req.params.id}, processResultWith(req, res));
  });

  app.put('/api/courses/:id', function(req, res) {
    Course
    .findOneAndUpdate({_id: req.params.id},
      // update data
      {
        card: req.body
      },
      processResultWith(req, res)
    );

  });

  app.delete('/api/courses/:id', authenticate, function(req, res) {
    console.log("req.user: ", req.user);

    res.json({
      status: 'success'
    });


    /*Course
      .findByIdAndRemove({_id: req.params.id},
        // delete data
        processResultWith(req, res)
      );*/

  });
};
