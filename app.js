// const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./routes/users');
const cards = require('./routes/cards');


const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// логирование
/* const timeLog = (req, res, next) => {
  console.log(new Date(), req.method);
  next();
};
*/
// app.use(timeLog);

// статическая раздача
// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// временное решение авторизации:
app.use((req, res, next) => {
  req.user = {
    _id: '5ec435607432699b7cba5fc1',
  };
  next();
});

app.use('/users', users);
app.use('/cards', cards);
app.use((req, res) => res.status(404).send({ message: `Запрашиваемый ресурс: ${req.url} не найден` }));
app.use((err, req, res) => res.status(500).json({ message: `Ошибка${err}` }));

// слушаем сервер при каждом обращении
app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
