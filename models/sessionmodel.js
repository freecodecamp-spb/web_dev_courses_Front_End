const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
  user_id: String,
  token: String,
  created_at: Date,
  is_expired: Boolean
});

module.exports = mongoose.model('Session', sessionSchema);
