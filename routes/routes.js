// routes/routes.js

const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/not-found-err');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.all('*', () => {
  throw new NotFoundError('Такой ресурс не доступен');
});

module.exports = router;
