const user = require('../models/user');
const {setUser} = require('../service/auth');
const {v4: uuidv4} = require('uuid');

async function createUser(req, res) {
    const {name, email, password} = req.body;
    await user.create({
        name: name,
        email: email,
        password: password
    })

    return res.redirect('/url'); // redirecting back to homepage
}

async function handleLogin(req, res){
    const {email, password} = req.body;
    const existingUser = await user.findOne({email, password});
    if(!existingUser){
        return res.render('login', {
            error: "Invalid username or password"
        });
    }
    const sessionid = uuidv4(); // if everything is correct we make a session id 
    setUser(sessionid, existingUser);
    res.cookie("uuid", sessionid);
    return res.redirect('/url'); // redirecting back to homepage
}

function signupPage(req, res){
    res.render('signup');
}

function loginPage(req, res){
    res.render('login');
}

module.exports = {
    createUser,
    signupPage,
    loginPage,
    handleLogin
}