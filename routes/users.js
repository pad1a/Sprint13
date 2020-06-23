// routes/users.js
const usersRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getUsers, findUser, updateUser, updateUserAvatar,
} = require('../controllers/users');
const { urlValidate } = require('../middlewares/isURL');

// GET
usersRouter.get('/', getUsers);
usersRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), findUser);

// PATCH
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().custom(urlValidate, 'urlValidator').required(),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
