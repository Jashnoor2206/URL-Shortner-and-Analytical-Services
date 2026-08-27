const user = require('../models/user');
const {setUser} = require('../service/auth');
const {v4: uuidv4} = require('uuid');

async function createUser(req, res) {
    const {name, email, password} = req.body;
    try{
        newUser = await user.create({
            name: name,
            email: email,
            password: password
        })
    }catch(err){
        console.log(err);
        return res.render('signup', {
            error : err.code === 11000 ? "Email already registered" : "Something else went wrong"
        });
    }
    token = setUser(newUser);
    res.cookie("uuid", token);
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
    const token = setUser(existingUser);
    res.cookie("uuid", token);
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