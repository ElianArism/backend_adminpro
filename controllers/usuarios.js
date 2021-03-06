const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { existeEmail } = require('../middlewares/existeEmail');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
    // leer param opcional de la url
    let paramDesde = Number(req.query.desde) || 0;
    try {

        // ejecutar estas promesas de manera simultanea (devuelve un array) y almacenar resultados en variables
        const [usuarios, totalUsers] = await Promise.all([
            // obtener usuarios de la base de datos
            Usuario
                .find({}, 'role google nombre email img')
                .skip( paramDesde )
                .limit(5),
            // obtener el total de registros Usuario en la bd
            Usuario.count()
        ]);

        
        return res.json({
            ok: true,
            usuarios,
            total: totalUsers
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
         ok: false,
         msg: 'Ocurrio un error inesperado, consulte al administrador.'
        });
    }
}

const postUsuarios = async (req, res = response) => {
    const { password, nombre } = req.body;

    let userDB;

    // crear nuevo usuario         
    const usuario = new Usuario(req.body);

    // encriptar password
    const salt = bcryptjs.genSaltSync(); //genera una data aleatoria que ayuda a encriptar la pass
    usuario.password = bcryptjs.hashSync(password, salt); //encriptar

    try {
        // guardar usuario en la bd
        userDB = await usuario.save();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false, 
            msg: 'Error inesperado, revisar logs.'
        });
    }
    
    // generar JWT 
    const token = await (generarJWT(userDB.id));


    return res.json({
        ok: true,
        usuario,
        token
    });
}

const putUsuarios = async (req, res) => {
    const uid = req.params.id;
    
    try {
        const usuarioDB = await Usuario.findById(uid); 
        
        if(!usuarioDB) {
            return res.status(404).json({
                ok: false, 
                msg: 'No se encontro un usuario que coincida con ese id.'
            });
        }

        // obtener campos que se pueden actualizar
        const {password, google, email, ...campos} = req.body;
        
        if(usuarioDB.email !== email) {
            // comprueba que no exista otro registro con el nuevo email que quiere actualizar
            existeEmail(req, res);
        }

        // si es de google no puede cambiar su email
        if(!usuarioDB.google) {
            campos.email = email; // si no existe, se le regresa el email
        } else if (usuarioDB.email !== email){ 
            return res.status(400).json({
                ok: false, 
                msg: 'Usuarios de google no pueden cambiar su correo'
            });
        }

        // actualizar usuario 
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        // generar JWT 
        const token = await (generarJWT(usuarioActualizado.id));
        
        return res.json({
            ok: true,
            usuarioActualizado, 
            token
        });

    } catch (error) {
        return res.status(500).json({  
            ok: false, 
            msg: 'Error inesperado, revisar logs.'+ error
        });
    }
}

const deleteUsuarios = async (req, res = response) => {
    const uid = req.params.id;

    
    try {
        // comprobar que exista
        const usuarioDB = await Usuario.findById(uid); 
        
        if(!usuarioDB) {
            return res.status(404).json({
                ok: false, 
                msg: 'No se encontro un usuario que coincida con ese id.'
            });
        }

        
        // eliminar usuario
        await Usuario.findOneAndDelete({'_id':uid}); //se manda un objeto donde la clave es la clave del id en el registro de la bd y el valor es el traido por params

        return res.json({
            ok: true, 
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        return res.status(500).json({
            ok: false, 
            msg: 'Ocurrio un error inesperado, hable con el administrador ', error
        });
    }
}

module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios, 
    deleteUsuarios
}
