const { nanoid } = require('nanoid');
const url = require('../models/url');

async function generateNewShortURL(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required '});

    const existing = await url.findOne({redirectURL: body.url});
    if(existing){
        return res.json({id: existing.shortID});
    }

    const shortID = nanoid(8);
    try{
        await url.create({
            shortID: shortID,
            redirectURL: body.url,
            visitHistory: [],
            createdBy : req.user._id
        })
        return res.json({id: shortID});
    }catch(err){
        console.log(err);
        return res.status(500).json({error : "failed to create short url"});
    }
};

async function getAnalytics(req, res){
    const shortID = req.params.shortID;
    const result = await url.findOne({shortID});
    return res.json({totalClicks: result.visitHistory.length});
}

async function redirectToOtherPage(req, res){
    const shortID = req.params.shortID;
    const element = await url.findOneAndUpdate(
        {shortID},
        {$push: {
            visitHistory : {
                timestamp : Date.now()
            }
        }}
    );

    res.redirect(element.redirectURL);
}

async function homePage(req, res){
    const allurl = await url.findOne({createdBy : req.user._id});
    res.render('homepage',{urls : allurl});
}

module.exports = {
    generateNewShortURL,
    getAnalytics,
    redirectToOtherPage,
    homePage
};