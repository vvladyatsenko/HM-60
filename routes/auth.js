const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = [];

// Регистрация
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const user = { username, password };
  users.push(user);
  res.send({ message: 'Пользователь зарегистрирован' });
});

// Вход
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = jwt.sign({ username }, 'your_jwt_secret', {
      expiresIn: '1h',
    });
    res.cookie('token', token, { httpOnly: true });
    res.send({ message: 'Вход выполнен' });
  } else {
    res.status(401).send({ message: 'Неверные учетные данные' });
  }
});

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, 'your_jwt_secret', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Пример защищенного маршрута
router.get('/protected', authenticateJWT, (req, res) => {
  res.send({ message: 'Это защищенный маршрут', user: req.user });
});

module.exports = router;
