const urlRoute = require('./routes/url');
const express = require('express');
const URL = require('./models/url');
const app = express();
const connectToMongoDB = require('./connect');
connectToMongoDB(app);

app.use(express.json());
app.use('/url', urlRoute);

app.get('/:shortID', async (req, res)=>{
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate({
        shortID
    }, {$push: {
        visitHistory : {
            timestamp : Date.now()
        }
    }});

    res.redirect(entry.redirectURL);
});