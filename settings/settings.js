'use strict'

const Settings = {
    port: process.env.PORT || 3000,
    serverResponse: "***\n### Добро пожаловать на сервер Webdev Courses!\n### СТАТУС СЕРВЕРА: OK. ПОРТ: ",
    dbResponse: "### БАЗА ДАННЫХ ПОДКЛЮЧЕНА.\n***",
    MOTD: "\nЧитайте вики проекта на гитхабе! Readme.md содержит информацию по api", // Указывайте здесь сообщения дня, если есть что передать другим разработчикам.
    database: "mongodb://webdevcourses:1234567890@ds019882.mlab.com:19882/web-dev-courses",
    secret: "i am gonna hash my strings up"
};

module.exports = Settings;
