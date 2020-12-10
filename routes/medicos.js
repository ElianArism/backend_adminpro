const {Router} = require('express');
const router = Router();  // metodo de express

// middlewares
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// estos middlewares son de la libreria express validator
const { check } = require('express-validator');

// controllers
const { getMedicos, postMedicos, putMedicos, deleteMedicos } = require('../controllers/medicos');

router.get('/', getMedicos);

router.post('/', 
  [
    validarJWT,
    check('nombre', 'El nombre es requerido.').not().isEmpty(),
    check('hospital', 'El id del hospital es requerido.').not().isEmpty(),
    check('hospital', 'El hospital id debe ser valido').isMongoId(),
    validarCampos
  ],
postMedicos); 

router.put('/:id',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('hospital', 'El id del hospital es obligatorio').not().isEmpty(),
    validarCampos
  ],
putMedicos);

router.delete('/:id', deleteMedicos);

module.exports = router;