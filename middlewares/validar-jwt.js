const jwt = require('jsonwebtoken');
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

module.exports = {validarJWT}