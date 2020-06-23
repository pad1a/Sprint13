// controllers/users.js
// это файл контроллеров
const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const User = require('../models/user');
// const validator = require('validator');
const BadReqError = require('../errors/bad-req-err');
const ConflictError = require('../errors/conflict-err');
// const AuthError = require('../errors/auth-err');
const NotFoundError = require('../errors/not-found-err');

const getUsers = (req, res, next) => {
  User.find({})
    .populate('user')
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// eslint-disable-next-line consistent-return
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadReqError('Неверный запрос');
      }
      // eslint-disable-next-line eqeqeq
      if (err.errors.email.kind === 'unique') {
        throw new ConflictError('Такой E-mail уже используется');
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByEmail(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Успешная авторизация' });
    })
    .catch(next);
};

const findUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } res.send({ data: user });
    })
    .catch(next);
};

// eslint-disable-next-line consistent-return
const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const opts = { runValidators: true };
  User.findByIdAndUpdate(req.user._id, { name, about }, opts)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const opts = { runValidators: true };
  User.findByIdAndUpdate(req.user._id, { avatar }, opts)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports = {
  getUsers, createUser, findUser, updateUserAvatar, login, updateUser,
};
