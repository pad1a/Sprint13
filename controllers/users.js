// controllers/users.js
// это файл контроллеров
const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === err.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === err.CastError) {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const allUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === err.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === err.CastError) {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const oneUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === err.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === err.CastError) {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { createUser, allUsers, oneUser };
