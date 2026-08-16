const urlRoute = require('./routes/url');
const express = require('express');
const URL = require('./models/url');
const app = express();
const userRoute = require('./routes/user');
const connectToMongoDB = require('./connect');
connectToMongoDB(app);

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/url', urlRoute);
app.use('/user', userRoute);