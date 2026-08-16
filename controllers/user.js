const user = require('../models/user');

async function createUser(req, res) {
    const {name, email, password} = req.body;
    await user.create({
        name: name,
        email: email,
        password: password
    })

    return res.render('homepage');
}

function signupPage(req, res){
    res.render('signup');
}

module.exports = {
    createUser,
    signupPage
}