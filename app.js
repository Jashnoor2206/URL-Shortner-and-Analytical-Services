const urlRoute = require('./routes/url');
const express = require('express');
const URL = require('./models/url');
const app = express();
const connectToMongoDB = require('./connect');
connectToMongoDB(app);

app.use(express.json());
app.use('/url', urlRoute);
