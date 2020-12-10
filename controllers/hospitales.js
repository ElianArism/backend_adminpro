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

const putHospitales = async (req, res = response) => {
    const id = req.params.id;
    const { nombre } = req.body;
    
    const campos = { usuario: id, nombre }; 
    
    try {
        const hospital = await Hospital.findById(id);
        
        if(hospital) {
            const hospitalDB = await Hospital.findByIdAndUpdate(id, campos, {new:true});
            
            return res.json({
                ok:true, 
                hospitalDB
            });
        } else {
            return res.status(404).json({
                ok: false, 
                msg: 'No se encontro un hospital que coincida con ese id'
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            ok:false, 
            msg: 'Internal Server Error: Contacte con el administrador'
        });
    }
    
    
}

const deleteHospitales = async (req, res = response) => {
    const id = req.params.id;

    try {
        const hospitalEliminado = await Hospital.findByIdAndDelete(id);
        if(!hospitalEliminado) {
            return res.status(404).json({
                ok: false, 
                msg: 'Not found: no se encontro un hospital con ese id'
            });
        }
        return res.json({
            ok:true, 
            msg: `Se elimino el ${hospitalEliminado.nombre}`
        });

        
    } catch (error) {
        return res.status(500).json({
            ok:false, 
            msg: 'Internal Server Error: Contacte con el administrador'
        });
    }
}

module.exports = {
    getHospitales,
    postHospitales,
    putHospitales,
    deleteHospitales
}