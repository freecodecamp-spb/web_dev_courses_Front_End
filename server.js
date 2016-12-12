// Запрос модулей, которые мы установили пакетным менеджером.
// О том, что делает каждый, можно почитать на npmjs.com
const path = require('path');
const express = require('express');
const engine = require('ejs-mate');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// Подключение собственных модулей
const routes = require('./routes/index'); //все основные маршруты.
const Settings = require('./settings/settings'); //настройки сервера.

const app = express(); //инициализация сервера на Express.

// Настройки сервера, берутся из объета Setting выше, которыйы создан из модуля settings.js
const PORT = Settings.port;
const MESSAGE = Settings.serverResponse + PORT;
const DBMESSAGE = Settings.dbResponse;
const MOTD = Settings.MOTD;
const SECRET = Settings.secret;

/**
 * Подключаем базу данных (mongoose - удобный пакет для работы с Монго)
 * Используем полноченные промисы
 *
 * @see http://mongoosejs.com/docs/promises.html
 */
mongoose.Promise = global.Promise;
mongoose.connect(Settings.database, function(err) {
    if (err) {
        console.log(err);
    }
    console.log(DBMESSAGE);
    console.log("Сообщение дня: " + MOTD); //Сообщения дня можно редактировать в фалйе настроек. Это больше для общения разработчиков.
});

// Это Middleware. Мы запускаем подключенные в начале модули с параметрами, если они нужны.
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.resolve(__dirname, 'build')));
app.use(bodyParser.json());

// DEV ONLY SETTINGS. DO NOT FORGET TO CHANGE.
// настройки сессии на сервере. think server-side cookies.
app.use(session({
    secret: SECRET,
    saveUninitialized: true,
    resave: true
}));
//^DEV

// Подключаем систему регистрации passport и используем сессии для хранения.
app.use(passport.initialize());
app.use(passport.session());


// Установка flash (тестовая)
app.use(flash());

app.use(function(req, res, next){
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Подключение API
// Внимание, порядок важен, роут * должен быть в самом конце
require('./settings/passport')(passport);
require('./routes/')(app, passport);

// SPA only
// TODO add server side render
app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(PORT, function() {
    console.log(MESSAGE);
    console.log("### Запускать по адресу -> localhost:" + PORT);
});
