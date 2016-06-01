var express = require('express');
var User = require('../models/usermodel');


module.exports = function(app, passport) {

    app.get('/profile', function(req, res) {
        if (req.user) {
            res.render("profile", {
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
};
