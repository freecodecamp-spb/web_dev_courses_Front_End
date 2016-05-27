// Запрос модулей, которые мы установили пакетным менеджером.
// О том, что делает каждый, можно почитать на npmjs.com
var express = require('express');
var engine = require('ejs-mate');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

// Подключение собственных модулей
var routes = require('./routes/index'); //все основные маршруты
var Settings = require('./settings/settings'); //настройки сервера

var app = express(); //инициализация сервера на Express

// Настройки сервера, берутся из объета Setting выше, которыйы создан из модуля settings.js
var PORT = Settings.port;
var MESSAGE = Settings.serverResponse + PORT;
var DBMESSAGE = Settings.dbResponse;
var MOTD = Settings.MOTD;
var SECRET = Settings.secret;

// Подключаем базу данных (mongoose - удобный пакет для работы с Монго)
mongoose.connect(Settings.database, function(err) {
    if (err) {
        console.log(err);
    };
    console.log(DBMESSAGE);
    console.log("Сообщение дня: " + MOTD); //Сообщения дня можно редактировать в фалйе настроек. Это больше для общения разработчиков.
});

// Это Middleware. Мы запускаем подключенные в начале модули с параметрами, если они нужны.
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
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

// Установка публичной ветки
app.use(express.static(__dirname + '/public'));

// Установка flash (тестовая)
app.use(flash())
app.use(function(req, res, next){
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

require('./settings/passport')(passport);
require('./routes/index')(app, passport);

// Используем обработчик view: EJS
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.listen(PORT, function() {
    console.log(MESSAGE);
    console.log("### Запускать по адресу -> localhost:" + PORT);
});
