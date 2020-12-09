const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {login} = require('../controllers/auth');
const router = Router();

router.post('/',
[
 check('email', 'El email es obligatorio.').isEmail(),
 check('password', 'La password es obligatoria.').not().isEmpty(),
 validarCampos
],
login);

module.exports = router;