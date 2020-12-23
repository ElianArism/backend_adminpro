const {Router} = require('express');
const router = Router();  // metodo de express

// middlewares
const {validarCampos} = require('../middlewares/validar-campos');
const {existeEmail} = require('../middlewares/existeEmail');
const { validarJWT, validarAdminRole, validarAdminRoleOMismoUsuario } = require('../middlewares/validar-jwt');

// estos middlewares son de la libreria express validator
const { check } = require('express-validator');
// controllers
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } = require('../controllers/usuarios');

router.get('/', validarJWT, getUsuarios);
router.post('/', 
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contrasenia es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos,
    existeEmail 
  ],
postUsuarios); 

router.put('/:id',
  [
    validarJWT,
    validarAdminRoleOMismoUsuario,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
  ],
putUsuarios);

router.delete('/:id', [validarJWT, 
  validarAdminRole], deleteUsuarios);

module.exports = router;