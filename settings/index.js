module.exports = {

  port: process.env.PORT || 3333,

  serverResponse: "***\n### Добро пожаловать на сервер Webdev Courses!\n### СТАТУС СЕРВЕРА: OK. ПОРТ: ",
  dbResponse: "### БАЗА ДАННЫХ ПОДКЛЮЧЕНА.\n***",
  MOTD: "\nЧитайте вики проекта на гитхабе! API базы данных!",

  database: process.env.DATABASE,

  auth0: {
    secret: process.env.AUTH0_SECRET,
    audience: process.env.AUTH0_AUDIENCE
  },

  admins: [
    {
      email: 'alex.baumgertner@gmail.com',
      nickname: 'Alex Baumgertner'
    }
    // Добавляйтесь!
    /*
     {
     email: 'ваша почта на гитхабе',
     nickname: 'ваш никнейм на фейсбуке'
     }
     */
  ]
};
