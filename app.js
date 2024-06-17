const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

// Настройка PUG и EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // Если используете PUG
app.engine('ejs', require('ejs').__express); // Если используете EJS

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/auth', authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
