const urlRoute = require('./routes/url');
const express = require('express');
const URL = require('./models/url');
const app = express();
const connectToMongoDB = require('./connect');
connectToMongoDB(app);

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());
app.use('/url', urlRoute);
