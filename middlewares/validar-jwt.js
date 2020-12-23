const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = (req, res, next) => {
    
    // leer token 
    const token = req.header('x-token');
    
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion (Unauthorized Request)'
        });
    }

    try {
        // recuperar payload
        const { payload } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = payload;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false, 
            msg: 'Token invalido 401 Unauthorized Request ' + error,
        });
    }
}

// validar que para realizar ciertas acciones sea admin
const validarAdminRole = async (req, res, next) => {
    const uid = req.uid;
    try {
        const usuario = await Usuario.findById(uid); 

        if(!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        } else if (usuario.role !== "ADMIN_ROLE") {
            return res.status(403).json({
                ok: false,
                msg: 'Unauthorized 403, no posee permisos para realizar estas acciones.'
            });
        }

        next();

        
    } catch (error) {
        
    }
}

// validar que para actualizar un usuario sea administrador o sea el mismo usuario
const validarAdminRoleOMismoUsuario = async (req, res, next) => {
    const uid = req.uid;
    const paramsid = req.params.id; 
    try {
        const usuario = await Usuario.findById(uid); 

        if(!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });

        } else if (usuario.role === "ADMIN_ROLE" || uid === paramsid) {
            next();
            
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'Unauthorized 403, no posee permisos para realizar estas acciones.'
            });
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error' + error
        });
    }
}
module.exports = {validarJWT, validarAdminRole, validarAdminRoleOMismoUsuario}