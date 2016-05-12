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
        }
        else     res.redirect("/");
    });
    // Не подключать

    //     app.get('/signup', function(req, res) {
    //         res.render("signup", {
    //             message: req.flash('signUpMessage')
    //         });
    //     });
    //
    //     app.get('/login', function(req, res) {
    //         res.render("login", {
    //             message: req.flash('loginMessage')
    //         });
    //     });
    //
    //
    //     app.get('/profile', isLoggedIn, function(req, res) {
    //         res.render("profile", {
    //             user: req.user
    //         });
    //     });
    //
    //     app.post('/signup', passport.authenticate('local-signup', {
    //         successRedirect: '/',
    //         failureRedirect: '/signup',
    //         failureFlash: true
    //     }));
    //
    //     app.post('/login', passport.authenticate('local-login', {
    //         successRedirect: '/profile',
    //         failureRedirect: '/login',
    //         failureFlash: true
    //     }));
    //
    //
    //     app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
    //     app.get('/auth/facebook/callback',
    //         passport.authenticate('facebook', {
    //             successRedirect: '/profile',
    //             failureRedirect: '/'
    //         }));
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
};
//
//
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/');
};
