// routes/users.js
const usersRoute = require('express').Router();
const { createUser, allUsers, oneUser } = require('../controllers/users');

// GET
usersRoute.get('/', allUsers);
usersRoute.get('/:userId', oneUser);

// POST
usersRoute.post('/', createUser);

module.exports = usersRoute;
