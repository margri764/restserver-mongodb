const mongoose = require ('mongoose');

const dbConnection = async () => {

    try {
        
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        
        console.log('base de datos online');

    } catch (error) {
        console.log(error)
        throw new Error('Error en la db');
   }

}

module.exports = {
    dbConnection
}