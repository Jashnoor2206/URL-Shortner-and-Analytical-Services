const urlRoute = require('./routes/url');
const express = require('express');
const app = express();
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');
const connectToMongoDB = require('./connect');
const {restrictToLoggedinUserOnly} = require('./middleware/auth');
connectToMongoDB(app);

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/url', restrictToLoggedinUserOnly, urlRoute);
app.use('/user', userRoute);