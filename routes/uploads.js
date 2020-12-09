const {Router} = require('express');
const router = Router();  // metodo de express

// middleware para subir archivos (libreria externa)
const expressUpload = require('express-fileupload');

// middlewares
const { validarJWT } = require('../middlewares/validar-jwt');

// controllers
const { fileUpload, retornarImg } = require('../controllers/uploads');

// ejecutar middleware necesario para subir archivos
router.use(expressUpload());

// subir archivo a una tabla especifica
router.put('/:tabla/:id' , validarJWT, fileUpload);

// obtener img 
router.get('/:tabla/:foto', validarJWT, retornarImg)



module.exports = router;