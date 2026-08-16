// route for authentication

const express = require('express');
const router = express.Router();
const {
        createUser, 
        signupPage
    } = require('../controllers/user');

router.post('/createUser', createUser);
router.get('/signup', signupPage);

module.exports = router;