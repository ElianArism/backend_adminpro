const { response } = require("express");
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getMedicos = async (req, res = response) => {
    const desde = Number(req.query.desde) || 0;
    try {
        // traer todos los medicos de la db
        const [totalMedicos, medicos] = await Promise.all([
            Medico.count(),
            Medico
                .find()
                .skip(desde)
                .limit(5)
                // traer el nombre del usuario/hospital que corresponda al id almacenado en el campo "usuario/hospital"
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img')
        ]);

        return res.json({
            ok: true,
            medicos, 
            totalMedicos
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

const putMedicos = async (req, res = response) => {
    const id = req.params.id; 
    const uid = req.uid; 
    const { nombre, hospital } = req.body; 
    
    // validar id hospital
    try {
        await Hospital.findById(hospital);
        
    } catch (error) {
        return res.status(401).json({
            ok: false, 
            msg: 'Id del hospital invalido'
        });            
    }

    // actualizar medico
    try {
        const campos = {usuario: uid, nombre, hospital }; 
        const medicoDB = await Medico.findByIdAndUpdate(id, campos, {new: true}); 
        
        if(!medicoDB) {
            return res.status(404).json({
                ok: false, 
                msg: 'No se encontro un medico que coincida con ese id'
            });
        }

        return res.json({
            ok: true,
            medicoDB
        });
        
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado, consulte al administrador.' + error
        });
    }
    
}

const deleteMedicos = async (req, res = response) => {
    const id = req.params.id; 
    try {
        const medicoEliminado = await Medico.findByIdAndDelete(id);
        
        if(!medicoEliminado) {
            return res.status(401).json({
                ok: false, 
                msg: 'Id del medico invalido'
            });
        }
        
        return res.json({
            ok: true,
            msg: `Medico eliminado ${medicoEliminado.nombre}`
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado, consulte al administrador.' + error
        });
    }


}

// traer un medico por id
const getMedicoById = async (req, res = response) => {
    const id = req.params.id; 
    
   if(id !== 'nuevo') {
        try {
        // traer todos los medicos de la db
        const medico = await 
            Medico.findById(id)
            // traer el nombre del usuario/hospital que corresponda al id almacenado en el campo "usuario/hospital"
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');

        return res.json({
            ok: true,
            medico
        });
        
        } catch (error) {
            return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado, consulte al administrador.'+error
            });
        }
    }
}
module.exports = {
    getMedicos,
    getMedicoById,
    postMedicos,
    putMedicos,
    deleteMedicos
}