const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/usermodel');
const configAuth = require('./auth');

function authCallback(type, profile, tokens, done) {
  console.log("tokens: ", tokens);

  let query = {};

  query[`${type}.id`] = profile.id;

  console.log("query: ", query);

  User
    .findOne(query).exec()
    .then((err, user) => {

      // Пользователь существует
      if (user) {
        return done(null, user);

        // Создать нового пользоватлеля
      } else {
        let newUser = new User();

        newUser.github.id = profile.id;
        newUser.github.name = profile.displayName;
        newUser.github.email = profile.email;
        newUser.github.avatar = profile._json.avatar_url;

        newUser
          .save()
          .then((err, data) => done(null, newUser))
          .catch(done);
      }
    })
    .catch(done)
}

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Модуль Стратегии авторизации.
  passport.use('github', new GitHubStrategy({
      clientID: configAuth.githubAuth.clientID,
      clientSecret: configAuth.githubAuth.clientSecret,
      callbackURL: configAuth.githubAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        authCallback('github', profile, {accessToken, refreshToken}, done);
      });
    }
  ));
};
