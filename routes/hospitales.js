const {Router} = require('express');
const router = Router();  // metodo de express

// middlewares
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// estos middlewares son de la libreria express validator
const { check } = require('express-validator');

// controllers
const { getHospitales, postHospitales, putHospitales, deleteHospitales } = require('../controllers/hospitales');
router.get('/' , getHospitales);

router.post('/', 
[
  validarJWT,
  check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
  validarCampos
], postHospitales); 

router.put('/:id',
  [
   
  ],
putHospitales);

router.delete('/:id', deleteHospitales);


module.exports = router;