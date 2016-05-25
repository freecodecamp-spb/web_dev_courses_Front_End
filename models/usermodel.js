var mongoose = require('mongoose');

// Модель пользователя для базы
var userSchema = mongoose.Schema({
    github: {
        id: String,
        email: String,
        name: String,
        avatar: String
    }
});

module.exports = mongoose.model('User', userSchema);
