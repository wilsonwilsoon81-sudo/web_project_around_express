const mongoose = require('mongoose');

const urlRegex = /^(http|https):\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El campo "name" es obligatorio'],
    minlength: [2, 'El campo "name" debe tener al menos 2 caracteres'],
    maxlength: [30, 'El campo "name" debe tener como máximo 30 caracteres'],
  },
  about: {
    type: String,
    required: [true, 'El campo "about" es obligatorio'],
    minlength: [2, 'El campo "about" debe tener al menos 2 caracteres'],
    maxlength: [30, 'El campo "about" debe tener como máximo 30 caracteres'],
  },
  avatar: {
    type: String,
    required: [true, 'El campo "avatar" es obligatorio'],
    validate: {
      validator: (v) => urlRegex.test(v),
      message: 'Por favor, introduce una URL válida para el avatar',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
