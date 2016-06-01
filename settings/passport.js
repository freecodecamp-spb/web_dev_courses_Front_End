var GitHubStrategy = require('passport-github2').Strategy
var User = require('../models/usermodel')
var configAuth = require('./auth')

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })

    // Модуль Стратегии авторизации.
    passport.use(new GitHubStrategy({
            clientID: configAuth.githubAuth.clientID,
            clientSecret: configAuth.githubAuth.clientSecret,
            callbackURL: configAuth.githubAuth.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                User.findOne({
                    'github.id': profile.id
                }, function(err, user) {
                    if (err) {
                        return done(err)
                    }
                    if (user) {
                        return done(null, user)
                    } else {
                        var newUser = new User()
                        newUser.github.id = profile.id
                        newUser.github.name = profile.displayName
                        newUser.github.email = profile.email
                        newUser.github.avatar = profile._json.avatar_url

                        newUser.save(function(err) {
                            if (err) {
                                throw err
                            }
                            return done(null, newUser)
                        })
                    }
                })
            })
        }
    ))
}
