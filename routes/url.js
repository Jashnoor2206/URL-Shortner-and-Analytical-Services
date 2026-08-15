const express = require('express');
const {
    generateNewShortURL, 
    getAnalytics, 
    redirectToOtherPage,
    homePage
} = require('../controllers/url')
const router = express.Router();

router.get('/', homePage);
router.post('/', generateNewShortURL);
router.get('/analytics/:shortID', getAnalytics);
router.get('/:shortID', redirectToOtherPage);

module.exports = router;