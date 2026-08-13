// here we will connect to mongodb

require('dotenv').config();
const mongoose = require('mongoose');

async function connectToMongoDB(app){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to the database');
        app.listen(3000);
    }catch(err){
        console.log(err);
    }
};

module.exports = connectToMongoDB;