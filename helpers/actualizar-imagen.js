// models
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

// libreria de node par manipular archivos del sistema
const fs = require('fs');

const actualizarImg = async (tabla, id, fileName) => {
    let pathImg = '';
    switch (tabla) {
        case 'medicos':
            const medico = await Medico.findById(id);
            
            if(!medico) {
                return false;
            }

            // verificar si el medico tiene una imagen
            pathImg = `./uploads/medicos/${medico.img}`;

            // borrarImg
            borrarImg(pathImg);
            
            // asignarle el nombre del archivo como nueva imagen del medico
            medico.img = fileName;

            // subir a la bd los cambios
            await medico.save();
            return true;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            
            if(!hospital) {
                return false;
            }

            // verificar si el hospital tiene una imagen
            pathImg = `./uploads/hospitales/${hospital.img}`;

            // borrarImg
            borrarImg(pathImg);
            
            // asignarle el nombre del archivo como nueva imagen del hospital
            hospital.img = fileName;

            // subir a la bd los cambios
            await hospital.save();
            return true;


        case 'usuarios':
            const usuario = await Usuario.findById(id);
            
            if(!usuario) {
                return false;
            }

            // verificar si el usuario tiene una imagen
            pathImg = `./uploads/usuarios/${usuario.img}`;

            // borrarImg
            borrarImg(pathImg);
            
            // asignarle el nombre del archivo como nueva imagen del usuario
            usuario.img = fileName;

            // subir a la bd los cambios
            await usuario.save();
            return true;

        default:
            break;
    }
}

const borrarImg = (path) => {

    // comprobar si existe una img y borrarla
    if(fs.existsSync(path)) { 
        // borrar img
        fs.unlinkSync(path);
    } 
    
}

module.exports = {actualizarImg} 