const {Router} = require('express');
const router = Router();  // metodo de express

// middlewares
const { validarJWT } = require('../middlewares/validar-jwt');

// controllers
const { getBusquedas, getBusquedaEspecifica } = require('../controllers/busquedas');

// busqueda en todas las tablas
router.get('/:busqueda' , validarJWT, getBusquedas);

// busqueda en una tabla especifica
router.get('/:tabla/:busqueda', validarJWT, getBusquedaEspecifica);

module.exports = router;