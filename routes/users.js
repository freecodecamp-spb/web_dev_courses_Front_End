const express = require('express');
const User = require('../models/usermodel');

module.exports = function(app, passport) {
  app.get('/profile', function(req, res) {
    if (req.user) {
      res.render("index", {
        user: req.user
      });
    } else {
      res.redirect("/");
    }
  });

  app.get(
    '/api/auth/github',
    (req, res, next) => {

      console.log("passport.authenticate: ", passport.authenticate);
      
      passport.authenticate(
        'github',
        {scope: ['user']},
        (err, user, data) => {
          res.json(user);
        }
      )(req, res, next);
    }
  );

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
