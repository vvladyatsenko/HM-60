const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Главная страница' });
});

router.post('/theme', (req, res) => {
  const { theme } = req.body;
  res.cookie('theme', theme, { maxAge: 900000, httpOnly: true });
  res.send({ message: 'Тема сохранена' });
});

module.exports = router;
