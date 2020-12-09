const { response } = require("express");
const Hospital = require("../models/hospital");
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');

const getBusquedas = async (req, res = response) => {

    // obteniendo lo que se quiere buscar
    const busqueda = req.params.busqueda;

    // expresion regular para hacer una busqueda flexible
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, hospitales, medicos] = await Promise.all([
        // buscar usuarios por nombre
        Usuario.find({nombre: regex}),
        // buscar hospitales por nombre
        Hospital.find({nombre: regex}),
        // buscar medicos por nombre
        Medico.find({nombre: regex})
    ])

    return res.json({
        ok: true, 
        busqueda: {
            usuarios,
            hospitales, 
            medicos
        }
    });
}

const getBusquedaEspecifica = async (req, res = response) => {
    // obteniendo la tabla en la que se quiere buscar
    const tabla = req.params.tabla;
    
    // obteniendo lo que se quiere buscar
    const busqueda = req.params.busqueda;

    // expresion regular para hacer una busqueda flexible
    const regex = new RegExp(busqueda, 'i');

    let resultado;

    switch (tabla) {
        case 'medicos':
            // buscar medicos por nombre
            resultado = await Medico
                .find({nombre: regex})
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;
    
        case 'hospitales':
            // buscar hospitales por nombre
            resultado = await Hospital
                .find({nombre: regex})
                .populate('usuario', 'nombre img');
            break;
    
        case 'usuarios':
            // buscar usuarios por nombre
            resultado = await Usuario.find({nombre: regex})
            break;
    
        default:
            res.status(400).json({
                ok: false,
                msg: 'Bad Request, solo se puede buscar "medicos", "hospitales" o "usuarios". Compruebe la url.'
            });
            break;
    }

    return res.json({
        ok: true, 
        resultado
    });
}

module.exports = {getBusquedas, getBusquedaEspecifica}