
const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth_controller');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post(
    '/new',
        [   
            // middlewares
            check('name', 'El nombre es obligatorio').not().isEmpty(),
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password es obligatorio').isLength({min: 6}),
            validarCampos
            
        ],


                
        crearUsuario);

router.post(
    '/', 
    [   
        // middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').isLength({min: 6}),
        validarCampos
    ],
    loginUsuario)

router.get('/renew', validarJWT, renovarToken )

module.exports = router;