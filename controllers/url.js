const { nanoid } = require('nanoid');
const url = require('../models/url');

async function generateNewShortURL(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required '});

    const shortID = nanoid(8);
    await url.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: []
    })
    return res.json({id: shortID});
};

async function getAnalytics(req, res){
    const shortID = req.params.shortID;
    const result = await url.findOne({shortID});
    return res.json({totalClicks: result.visitHistory.length});
}

module.exports = {
    generateNewShortURL, getAnalytics
};