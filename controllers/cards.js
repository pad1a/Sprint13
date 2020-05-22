// controllers/cards.js
// это файл контроллеров
const Card = require('../models/card');

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(400).send({ message: `${err}` }));
};

const allCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(400).send({ message: `${err}` }));
};

const delCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(404).send({ message: `${err}` }));
};

module.exports = { createCard, allCards, delCard };
