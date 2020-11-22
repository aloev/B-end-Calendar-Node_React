


const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
                    // Connect to DATABASE

        await mongoose.connect( process.env.DB_CNN , {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        
        });

        console.log('DB Online');
    } catch (e) {
        console.log(e);
        throw new Error('Base de datos');
    }
}


module.exports = {
    dbConnection
}