const { response } = require("express")
const  Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/jwt');
const bcryptjs = require('bcryptjs');
const {googleVerify} = require("../helpers/google-verify");

const login = async(req, res = response) => {
    const { email, password } = req.body;
        
    try {
        
        // verificar email
        const usuarioDB = await Usuario.findOne({email});
        
        if(!usuarioDB) {
            return res.status(404).json({
                ok: false, 
                msg: 'Password o correo invalidos'
            });
        }

        // verificar password
        const validPassword = bcryptjs.compareSync(password, usuarioDB.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false, 
                msg: 'Password o correo invalidos'
            });
        }

        // Generar token - JWT
        const token = await generarJWT(usuarioDB.id);

        return res.json({
            ok: true,
            token
        });
    
    } catch (error) {
        return res.status(500).json({
            ok: false, 
            msg: 'Ocurrio un error inesperado, hable con el administrador ' + error
        });
    }
}

const googleSignIn = async (req, res = response) => {
    
    const googleToken = req.body.token;
    
    try {
        const {name, email, picture} = await googleVerify(googleToken);

        // comprobar que no exista user con ese email. 
        const usuarioDB  = await Usuario.findOne({email});
        
        let usuario;
        
        if(!usuarioDB) {
            // si no existe se crea uno nuevo
            usuario = new Usuario({
                role: 'USER_ROLE',
                img: picture,
                email,
                nombre: name,
                password: "Nico sos un capo",
                google: true
            });
        } else {
            // existe usuario lo transformamos a uno de google
            usuario = usuarioDB; 
            usuario.google = true;
        }

        // guardar en la bd 
        const nuevoUser = await usuario.save();

        // generar jwt 
       const token = await generarJWT(usuario.id);
        
        
        return res.json({
            ok: true, 
            nuevoUser,
            token
        });
        
    } catch (error) {
        return res.status(401).json({
            ok: false, 
            msg: 'Unauthorized Request: Token invalido '+ error,
            error
        });
    } 
}

const renovarToken = async (req, res = response ) => {
    const uid = req.uid;
    // generar jwt 
    const token = await generarJWT(uid);
    
    return res.json({
        ok: true, 
        token, 
    });
}
module.exports = { login, googleSignIn, renovarToken }