// route for authentication

const express = require('express');
const router = express.Router();
const {
        createUser, 
        signupPage,
        loginPage,
        handleLogin
    } = require('../controllers/user');

router.post('/createUser', createUser);
router.get('/signup', signupPage);
router.get('/login', loginPage);
router.post('/login', handleLogin);

module.exports = router;