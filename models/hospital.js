const { Schema, model } = require('mongoose');


// crear Schema
const HospitalSchema = Schema ({
    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    usuario : {
        require: true,
        type: Schema.Types.ObjectId, //relacion entre este documento y un usuario
        ref: 'Usuario'
    }
},
// cambiar nombre de la coleccion 
{ collection: 'hospitales'}
);

// cambiar la forma en la que se imprimen las propiedades del Schema en formato JSON
HospitalSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    return object;
});
module.exports = model('Hospital', HospitalSchema); // Inicializando modelo