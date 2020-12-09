const {response} = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    try {
        // traer hospitales de la db
        const hospitales = await 
            Hospital.find()
            // traer el nombre del usuario que corresponda al id almacenado en el campo "usuario"
            .populate('usuario', 'nombre img') ;

        return res.json({
            ok:true, 
            hospitales
        });

    } catch (error) {
       console.log(error);
       return res.status(500).json({
        ok: false,
        msg: 'Ocurrio un error inesperado, consulte al administrador.'
       });
    }

}

const postHospitales = async (req, res = response) => {
    let hospitalDB;
    // obtener id del usuario que crea el hospital
    const uid = req.uid;

    // crear nuevo hospital
    const hospital = new Hospital( {
        usuario: uid,
        ...req.body
    });
    
    try {
        // guardar el hospital en la bd
        hospitalDB = await hospital.save();

    } catch (error) {
        return res.status(500).json({
            ok: false, 
            msg: 'Error inesperado, consulte al administrador.'
        });
    }

    return res.json({
        ok:true, 
        hospitalDB
    });
}

const putHospitales = (req, res = response) => {
    return res.json({
        ok:true, 
        hospitalDB: 'getHospitales'
    });
}

const deleteHospitales = (req, res = response) => {
    return res.json({
        ok:true, 
        msg: 'getHospitales'
    });
}

module.exports = {
    getHospitales,
    postHospitales,
    putHospitales,
    deleteHospitales
}