const mongoose = require('mongoose');

// Модель пользователя для базы
const userSchema = mongoose.Schema({
    github: {
        id: String,
        email: String,
        name: String,
        avatar: String
    }
});

module.exports = mongoose.model('User', userSchema);
