// controllers/cards.js
// это файл контроллеров
const validator = require('validator');
const Card = require('../models/card');

const createCard = (req, res) => {
  const {
    name, link, createdAt,
  } = req.body;
  Card.create({
    name, link, owner: req.user._id, createdAt,
  })
    .then((card) => {
      if (validator.isURL(link)) {
        res.status(200).send({ data: card });
      } else res.status(400).send({ message: 'Некорректная ссылка на изображение' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const allCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const delCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
      } else if (card.owner.toString() === req.user._id) {
        card.remove(req.params.cardId);
        res.status(200).send(card);
      } else {
        res.status(403).send({ message: 'Нет прав на удаление' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { createCard, allCards, delCard };
