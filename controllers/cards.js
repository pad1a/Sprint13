// controllers/cards.js
// это файл контроллеров
const Card = require('../models/card');

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
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

const allCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
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

const delCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Card not found' });
      }
      return res.send({ data: card });
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

module.exports = { createCard, allCards, delCard };
