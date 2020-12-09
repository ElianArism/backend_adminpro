const { Schema, model } = require('mongoose');


// crear Schema
const UsuarioSchema = Schema ({
    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});

// cambiar la forma en la que se imprimen las propiedades del Schema en formato JSON
UsuarioSchema.method('toJSON', function() {
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})
module.exports = model('Usuario', UsuarioSchema); // Inicializando modelo