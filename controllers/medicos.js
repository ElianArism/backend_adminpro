const { response } = require("express");
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {
    try {
        // traer todos los medicos de la db
        const medicos = await  
            Medico.find()
            // traer el nombre del usuario/hospital que corresponda al id almacenado en el campo "usuario/hospital"
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');

        return res.json({
            ok: true,
            medicos
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
         ok: false,
         msg: 'Ocurrio un error inesperado, consulte al administrador.'
        });
    }
}

const postMedicos = async (req, res = response) => {
    let medicoDB;

    // obtener id del usuario que crea al medico
    const uid = req.uid;
    
    // crear nuevo medico
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        // guardar medico en la bd
        medicoDB = await medico.save();    
        
    } catch (error) {
       console.log(error);
       return res.status(500).json({
        ok: false,
        msg: 'Ocurrio un error inesperado, consulte al administrador.'
       });
    }
    return res.json({
        ok: true,
        medicoDB
    });
}

const putMedicos = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'Medicos works!'
    });
}

const deleteMedicos = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'Medicos works!'
    });
}

module.exports = {
    getMedicos,
    postMedicos,
    putMedicos,
    deleteMedicos
}