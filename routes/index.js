const express = require('express');
const User = require('../models/usermodel');
const Course = require('../models/coursemodel');


module.exports = function(app, passport) {
  // Мы подключаем модуль с маршрутами в наш app и сразу делегируем туда passport - пусть лежит, все равно подключать
  // app.get слушает запрос(get) по адресу. "/" в данном случае это рут. "/about" это был бы localhost:3000/about
  // res.render отображает страницу с помощью нашего движка который мы указали в server.js - EJS
  // "main" - это название файля для рендера из папки "/views"
  
  app.get('/', function(req, res) {
    res.render("index", {
      user: req.user,
      message: req.flash()
    });
  });
  
  app.get('/api/courses/', function(req, res) {
    let query = req.query;
    let page = Number(query.page) || 1;

    let callback = (err, courseList) => {
      if (err) {
        res.send(err);
      } else {
  
        Course.count((err, count) => {
          res.json({
            courses: courseList,
            page: page,
            count: count
          });
        });
      }
    };
    
    Course.find(callback).limit(10).skip((page - 1) * 10).sort({"card.title": 1});
  });

  app.post('/api/courses/', function(req, res) {
    let callback = (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    };

    let course = new Course(req.body);

    course.save(callback);
  });
  
  app.get('/api/courses/:id', function(req, res) {
    let id = req.params.id;
    
    let callback = (err, courseData) => {
      if (err) {
        res.send(err);
      } else {
        res.json(courseData);
      }
    };
  
    Course.findOne({_id: id}, callback);
  });
  
  app.put('/api/courses/:id', function(req, res) {
    let callback = (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    };

    Course.findOneAndUpdate(
      // query
      {
        _id: req.params.id
      },
      
      // update data
      {
        card: req.body
      },
      callback
    );
    
  });
  
  app.get('/form', function(req, res) {
    res.render("index", {
      user: req.user
    });
  });
  
  app.get('/profile', function(req, res) {
    if (req.user) {
      res.render("index", {
        user: req.user
      });
    } else {
      res.redirect("/");
    }
  });
  
  app.get('/auth/github', passport.authenticate('github', {
    scope: ['user']
  }));
  
  app.get('/auth/github/callback',
    passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/'
    })
  );
  
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  
  app.get('/users', function(req, res) {
    res.render('index', {
      user: req.user
    });
  });
  
  app.get('/users/get', function(req, res) {
    User.find(function(err, userlist) {
      if (err) res.send(err);
      res.json(userlist);
    });
  });
};
