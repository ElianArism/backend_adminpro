const { Schema, model } = require('mongoose');

// crear Schema
const MedicoSchema = Schema ({
    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    usuario: {
        require: true,
        type: Schema.Types.ObjectId, //relacion entre este documento y un usuario
        ref: 'Usuario'
    },
    hospital: {
        require: true,
        type: Schema.Types.ObjectId, //relacion entre este documento y un hospital
        ref: 'Hospital'
    }
});

// cambiar la forma en la que se imprimen las propiedades del Schema en formato JSON
MedicoSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.mid = _id;
    return object;
})
module.exports = model('Medico', MedicoSchema); // Inicializando modelo