const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const routes = require('./routes/routes.js');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// статическая раздача
// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

// защитили все роуты кроме создания юзера и логина
app.use(auth);
app.use('/', routes);

app.use((req, res) => res.status(404).send({ message: `Запрашиваемый ресурс: ${req.url} не найден` }));
app.use((err, req, res) => res.status(500).json({ message: `Ошибка${err}` }));

// слушаем сервер при каждом обращении
app.listen(PORT, () => {
});
