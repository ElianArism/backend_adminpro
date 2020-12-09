const { response } = require("express")
const  Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/jwt');
const bcryptjs = require('bcryptjs');

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
            msg: token
        });
    
    } catch (error) {
        return res.status(500).json({
            ok: false, 
            msg: 'Ocurrio un error inesperado, hable con el administrador ' + error
        });
    }
}

module.exports = {login}