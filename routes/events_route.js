const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, crearEventos, actualizarEventos, deleteEvento } = require("../controllers/events_controller");
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const router = Router();

// Pasar todas por el middleware

router.use( validarJWT );

router.get('/', getEventos);

// crear un nuevo evento

router.post('/', 

    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha final es obligatoria').custom(isDate),
        validarCampos
    ],
    
    crearEventos);

// Actualizar evento

router.put('/:id', actualizarEventos);

// Borrar evento

router.delete('/:id', deleteEvento);


module.exports = router;