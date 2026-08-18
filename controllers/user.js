const user = require('../models/user');

async function createUser(req, res) {
    const {name, email, password} = req.body;
    await user.create({
        name: name,
        email: email,
        password: password
    })

    return res.redirect('/'); // redirecting back to homepage
}

async function handleLogin(req, res){
    const {email, password} = req.body;
    const User = user.findOne({email, password});
    if(!User){
        return res.render('login', {
            error: "Invalid username or password"
        });
    }
    return res.redirect('/'); // redirecting back to homepage
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