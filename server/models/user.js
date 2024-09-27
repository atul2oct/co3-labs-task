const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    telegramId: String,
    coins: Number,
  });

module.exports = mongoose.model('User', userSchema);