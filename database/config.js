const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        // cadena de conexion a la bd
        await mongoose.connect(
            process.env.DB_CONN,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        );

        console.log(`DB online`);
        
    } catch (error) {
        throw new Error('Error a la hora de iniciar la BD, ver logs');
    }

}

module.exports = {
    dbConnection
}