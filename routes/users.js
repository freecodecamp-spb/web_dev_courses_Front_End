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
      passport.authenticate('github', {scope: ['user']}, (error, user, info) => {
        console.log("error: ", error);
        console.log("user: ", user);
        console.log("info: ", info);
      });
    }
    /*
    *
    *  https://github.com/login/oauth/authorize?
    *  response_type=code&
    *  redirect_uri=ht…A3333%2Fauth%2Fgithub%2Fcallback&
    *  scope=user&
    *  client_id=a7d4334f13bbacdd7303.
    *
    *  Redirect from 'https://github.com/login/oauth/authorize?response_type=code&redirect_uri=ht…A3333%2Fauth%2Fgithub%2Fcallback&scope=user&client_id=a7d4334f13bbacdd7303
    *
    *
    *
    *
    * */

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
