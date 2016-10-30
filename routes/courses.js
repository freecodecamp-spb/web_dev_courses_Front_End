const express = require('express');
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

  app.get('/api/courses/', function(req, res) {
    let query = req.query;
    let page = Number(query.page) || 1;

    // TODO refactor to Promises
    Course.count((err, count) => {
      if (err) {
        res.json(err);
        return;
      }

      Course.find((err, courses) => {
              if (err) {
                res.json(err);
                return;
              }

              res.json({
                count: count,
                courses: courses
              });
            })
            .limit(10)
            .skip((page - 1) * 10)
            .sort({"card.title": 1});
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
};
