var express = require('express');
var User = require('../models/usermodel');


module.exports = function(app, passport) {
    // Мы подключаем модуль с маршрутами в наш app и сразу делегируем туда passport - пусть лежит, все равно подключать
    // app.get слушает запрос(get) по адресу. "/" в данном случае это рут. "/about" это был бы localhost:3000/about
    // res.render отображает страницу с помощью нашего движка который мы указали в server.js - EJS
    // "main" - это название файля для рендера из папки "/views"

    app.get('/', function(req, res) {
        res.render("main", {
            user: req.user
        });
    });

    app.get('/profile', function(req, res, next) {
        if (req.user) {
            res.render("profile", {
                user: req.user
            })
        } else res.redirect("/");
    });

    app.get('/auth/github', passport.authenticate('github', {
        scope: ['user']
    }));
    app.get('/auth/github/callback',
        passport.authenticate('github', {
            successRedirect: '/',
            failureRedirect: '/'
        }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/users', function(req, res) {
        res.render('users', {
            user: req.user
        });
    });

    app.get('/users/get', function(req, res) {
        User.find(function(err, userlist) {
        if (err) res.send(err);
            res.json(userlist);
            // res.redirect('users');
        });
    });
    //
    // app.get('users/*', function(req, res) {
    //     res.render('users');
    // });

}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/');
};
