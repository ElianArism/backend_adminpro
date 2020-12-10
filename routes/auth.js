const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { login, googleSignIn, renovarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

// login normal
router.post('/',
[
 check('email', 'El email es obligatorio.').isEmail(),
 check('password', 'La password es obligatoria.').not().isEmpty(),
 validarCampos
],
login);

// renovar token
router.get('/renovar-token', 
validarJWT,
renovarToken);

// google login
router.post('/google', 
check('token', 'el token de Google es obligatorio').not().isEmpty(),
googleSignIn);

module.exports = router;