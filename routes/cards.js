const cardsRoute = require('express').Router();
const { createCard, allCards, delCard } = require('../controllers/cards');

// GET
cardsRoute.get('/', allCards);

// POST
cardsRoute.post('/', createCard);

// DELETE
cardsRoute.delete('/:cardId', delCard);

module.exports = cardsRoute;
