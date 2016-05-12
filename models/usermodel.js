var mongoose = require('mongoose');

// Модель пользователя для базы
// Фейсбук не трогайте
var userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String
},
facebook: {
    id: String,
    token: String,
    email: String,
    name: String
},
github: {
    id: String,
    email: String,
    name: String,
    avatar: String
}
});

module.exports = mongoose.model('User', userSchema);
