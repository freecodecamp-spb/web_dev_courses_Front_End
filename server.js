const path = require('path');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const Settings = require('./settings');
const { port, serverResponse, dbResponse, MOTD } = Settings;

/**
 * Подключаем базу данных (mongoose - удобный пакет для работы с Монго)
 * Используем полноченные промисы
 *
 * @see http://mongoosejs.com/docs/promises.html
 */
mongoose.Promise = global.Promise;
mongoose.connect(Settings.database, err =>
   err ? console.log(`Database error: ${err}`):
       console.log(dbResponse, "\nСообщение дня: ", MOTD));

// Это Middleware. Мы запускаем подключенные в начале модули с параметрами, если они нужны.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Подключение API. Внимание, порядок важен, роут * должен быть в самом конце
require('./routes/')(app);
app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')));
app.listen(port, () => console.log(`${serverResponse}\n### Запускать по адресу -> localhost: ${port}`));
