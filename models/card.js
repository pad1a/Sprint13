// models/user.js
const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const urlValidator = [
  validate({
    validator: 'isURL',
    // arguments: [3, 50],
    message: 'Неверный формат URL',
  }),
];

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: urlValidator,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
