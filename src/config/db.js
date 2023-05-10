const mongoose = require('mongoose');

module.exports = async (mongoUrl) => {
    mongoose.connection.once('open', () => {
        console.log('Succesful connection to DB');
    });
    
    mongoose.connection.on('error', (error) => {
        console.error(`Failed connection to DB: ${error}`);
    })
    
    await mongoose.connect(mongoUrl)
}