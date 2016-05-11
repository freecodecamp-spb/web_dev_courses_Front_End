var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GitHubStrategy = require('passport-github2').Strategy;
var User = require('../models/usermodel');
var configAuth = require('./auth');

module.exports = function(passport) {

    // Модуль Стратегий авторизации. Есть локальная и фейсбук. НЕ подключены пока.

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // passport.use('local-signup', new LocalStrategy({
    //         usernameField: 'email',
    //         passwordField: 'password',
    //         passReqToCallback: true
    //     },
    //     function(req, email, password, done) {
    //         process.nextTick(function() {
    //             User.findOne({
    //                 'local.email': email
    //             }, function(err, user) {
    //                 if (err)
    //                     return done(err);
    //                 if (user) {
    //                     return done(null, false, req.flash('signupMessage', 'That email already taken'));
    //                 } else {
    //                     var newUser = new User();
    //                     newUser.local.email = email;
    //                     newUser.local.password = password;
    //                     newUser.save(function(err) {
    //                         if (err)
    //                             throw err;
    //                         return done(null, newUser);
    //                     })
    //                 }
    //             })
    //         });
    //     }));
    //
    // passport.use('local-login', new LocalStrategy({
    //         usernameField: 'email',
    //         passwordField: 'password',
    //         passReqToCallback: true
    //     },
    //     function(req, email, password, done) {
    //         process.nextTick(function() {
    //             User.findOne({
    //                 'local.email': email
    //             }, function(err, user) {
    //                 if (err)
    //                     return done(err);
    //                 if (!user)
    //                     return done(null, false, req.flash('loginMessage', 'No User found'));
    //                 if (user.local.password != password) {
    //                     return done(null, false, req.flash('loginMessage', 'invalid password'));
    //                 }
    //                 return done(null, user);
    //             });
    //         });
    //     }));
    //
    // passport.use(new FacebookStrategy({
    //         clientID: configAuth.facebookAuth.clientID,
    //         clientSecret: configAuth.facebookAuth.clientSecret,
    //         callbackURL: configAuth.facebookAuth.callbackURL,
    //         profileFields: ['emails' , 'name', 'id']
    //     },
    //     function(accessToken, refreshToken, profile, done) {
    //         process.nextTick(function() {
    //             User.findOne({
    //                 'facebook.id': profile.id
    //             }, function(err, user) {
    //                 if (err)
    //                     return done(err);
    //                 if (user)
    //                     return done(null, user);
    //                 else {
    //                     var newUser = new User();
    //                     newUser.facebook.id = profile.id;
    //                     newUser.facebook.token = accessToken;
    //                     newUser.facebook.name = profile.name.givenName + " " + profile.name.familyName;
    //                     newUser.facebook.email = profile.emails[0].value;
    //
    //                     newUser.save(function(err) {
    //                         if (err)
    //                             throw err;
    //                         return done(null, newUser);
    //                     })
    //                 }
    //             });
    //         });
    //     }
    // ));

    passport.use(new GitHubStrategy({
            clientID: configAuth.githubAuth.clientID,
            clientSecret: configAuth.githubAuth.clientSecret,
            callbackURL: configAuth.githubAuth.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function() {
                User.findOne({
                    'github.id': profile.id
                }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user)
                        return done(null, user);
                    else {
                        console.log(profile); //DEV
                        var newUser = new User();
                        newUser.github.id = profile.id;
                        newUser.github.name = profile.displayName;
                        newUser.github.email = profile.email;
                        newUser.github.avatar = profile._json.avatar_url;

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        })
                    }
                });
            });
        }
    ));
};
