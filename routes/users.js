const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const settings = require('../settings/settings');

const User = require('../models/usermodel');
const Session = require('../models/sessionmodel');

module.exports = function(app) {

  /**
   * POST /api/auth/login
   */
  app.post('/api/auth/login', (req, res) => {
    let userReqData = req.body || {};
    let query = {'email': userReqData.email};
    let errorHandler = (err) => {
      res.status('400').json({
        error: err
      });
    };

    User.findOne(query).exec()
        .then(user => {

          // совпадает ли зашифрованный пароль в запросе и в БД
          // создать сессию (TODO: перейти на JWT)
          if (bcrypt.compareSync(userReqData.password, user.password)) {

            // if user is found and password is right
            // create a token
            let tokenID;

            require('crypto').randomBytes(48, function(err, buffer) {
              tokenID = buffer.toString('hex');

              let token = jwt.sign(
                {
                  user_id: user._id,
                  user_name: user.email,
                  session_id: tokenID
                },
                settings.secret,
                {
                  expiresIn: 1 // expires in 24 hours
                });

              res.json({
                success: 'Authenticated',
                token
              });
            });




          } else {
            res.status('401').json({
              error: 'Unauthorized'
            });
          }
        })
        .catch(errorHandler);
  });

  app.post('/api/auth/signup', (req, res) => {
    let userData = req.body;
    let userModel;

    // Проверить, есть ли такой пользователь в БД,
    User.findOne({
      'email': userData.email
    }, (err, data) => {
      // ошибка в БД
      if (err) {
        res.status('400').json({
          error: err
        });

        // Пользователь уже существует
      } else if (data) {
        // если есть — вернуть ошибку и предложить войти/напомнить пароль
        res.status('409').json({
          error: 'User already exists',
          data
        });

      } else {
        // если пользователя в БД нет,

        if (userData.password !== userData.passwordConfirm) {
          res.status('400').json({
            error: 'Password confirmation error'
          });
        } else {
          delete userData.passwordConfirm;

          userData.password = bcrypt.hashSync(userData.password, 10);

          userModel = new User(userData);

          // проверить совпадает ли пароль и подтверждение пароля
          // если не совпапают — вернуть ошибку и предложить ввести пароли заново

          userModel.save((err, data) => {
            if (err) {
              res.status('400').json({
                error: err
              });

            } else {
              res.status('201').json({
                success: 'User created',
                data
              });
            }

          });
        }
      }
    });

    // если совпадают - создать нового пользователя в бд и
    // создать сессию и установить сессионную cookie пользователю (TODO: перейти на JWT)
  });

  app.get('/api/users/', function(req, res) {
    User.find(function(err, userlist) {
      if (err) res.send(err);
      res.json(userlist);
    });
  });

};
