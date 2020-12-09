const { response } = require("express");
const path = require('path');
const fs = require("fs");
// helpers 
const { procesarImg } = require('../helpers/procesar-imagen');
const { actualizarImg } = require("../helpers/actualizar-imagen");


const fileUpload = (req, res = response) => {
    // obteniendo la tabla y el id de los url params
    const {tabla, id} = req.params;
    
    // validar tabla
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    
    if(!tiposValidos.includes(tabla)) {
        return res.status(400).json({
            ok:false, 
            msg: 'Bad Request, no es un medico usuario u hospital.'
        });
    }

    // si no se envia ningun archivo para subir
    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false, 
            msg: 'Bad Request, no se suministraron archivos para subir.'
        });
    }

    // obtener img de la request
    const file = req.files.img;

    // procesar la imagen para subirla
    const { fileName, path } = procesarImg(file, tabla);

    if(!fileName || !path) {
        return res.status(400).json({
            ok:false, 
            msg: 'Bad Request, el archivo no posee extension valida.'
        });
    }
    
    // trasladar la imagen al directorio requerido 
    file.mv( path, (err) => {
        if(err) {
            console.log(err);
            return res.status(500).json({
                ok: false, 
                msg: 'Internal Server Error. Error al mover imagen'
            });
        } else {
            // actualizar base de datos
            actualizarImg(tabla, id, fileName);

            return res.json({
                ok: true, 
                msg: 'Archivo subido!',
                fileName
            });
        }
    });

}

const retornarImg = (req, res) => {
    const tabla = req.params.tabla;
    const foto = req.params.foto;

    // construir path donde se encuentra la img
    const pathImg = path.join(__dirname, `../uploads/${tabla}/${foto}`);
    
    // comprobar si el path lleva a una imagen existente
    if(fs.existsSync(pathImg)) {
        // retornar img
        return res.sendFile( pathImg );

    } else {
        // si no existe, se envia una img por defecto
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        return res.sendFile( pathImg );
    }
}


module.exports = {fileUpload, retornarImg}