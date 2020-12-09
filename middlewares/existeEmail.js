const { response } = require("express");
const Usuario = require('../models/usuario');

const existeEmail = async (req, res = response, next) => {
    const {email} = req.body;
    const existeEmail = await Usuario.findOne({email});
    
    if(existeEmail) {
        return res.status(400).json({
            ok: false,
            msg: 'El correo ya esta registrado.'
        });
    }

    next();
}

module.exports = { existeEmail }