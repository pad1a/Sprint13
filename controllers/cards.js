// controllers/cards.js
// это файл контроллеров

const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForBidError = require('../errors/for-bid-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const {
    name, link, createdAt,
  } = req.body;
  Card.create({
    name, link, owner: req.user._id, createdAt,
  })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
  // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      } if (card.owner._id.toString() === req.user._id) {
        return card.remove(req.params.cardId).then(() => res.status(200).send({ message: 'Карточка удалена' }));
      } throw new ForBidError('Недостаточно прав');
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      } else {
        res.send({ data: card });
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      } else {
        res.send({ data: card });
      }
    })
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
