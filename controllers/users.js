// controllers/users.js
// это файл контроллеров
const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: `${err}` }));
};

const allUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: `${err}` }));
};

const oneUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(404).send({ message: `${err}` }));
};

module.exports = { createUser, allUsers, oneUser };
