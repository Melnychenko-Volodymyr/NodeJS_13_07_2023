const mongoose = require('mongoose');

// Оголошення схеми для колекції orders
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });

const model = mongoose.model('User', userSchema);

module.exports = model;

