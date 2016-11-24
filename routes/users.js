const express = require('express');
const User = require('../models/usermodel');
const bcrypt = require('bcrypt');

module.exports = function(app, passport) {

  app.post('/api/auth/login', (req, res) => {
    let userData = req.body || {};

    // Проверить, есть ли такой пользователь в БД и
    User.findOne({
      'email': userData.email
    }, (err, data) => {

      if (err) {
        res.status('400').json({
          error: err
        });
      } else if (data) {

        if (bcrypt.compareSync(userData.password, data.password)) {
          res.status('201').json({
            success: 'User authenticated',
            data
          });
        } else {
          res.status('401').json({
            error: 'Unauthorized',
            data
          });
        }

      } else {
        res.status('400').json({
          error: 'Something wrong'
        });
      }

    });
    // Проверить, есть ли такой пользователь в БД и
    // совпадает ли зашифрованный пароль в запросе и в БД

    // если совпадают - создать нового пользователя в бд и
    // создать сессию и установить сессионную cookie пользователю (TODO: перейти на JWT)

    // если не совпадают — вернуть ошибку и предложить напомнить пароль
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
