const { response } = require('express');
const Usuario  = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async ( req, res = response) => {

    const {  email: incomingEmail, password } = req.body; 

    try {

        let usuario = await Usuario.findOne({ email: incomingEmail})

        if( usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        usuario = new Usuario( req.body );

        // Encriptar contraseña

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
    
        // Disparo a Base de Datos
        await usuario.save();


        // Generar Token
        const token = await generarJWT( usuario.id, usuario.name );


        res.status(401).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name, 
            token
        });
    
    } catch (e) {
        

        res.status(500).json({
            ok: false,
            msg: 'Hable con admin'
        })
    }

}
const loginUsuario = async( req, res = response) => {
    
    const {  email, password } = req.body; 

    try {

        const usuario = await Usuario.findOne({ email})

        if( !usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // confirmar passwords
    
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (e) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con admin'
        })
    }

}
const renovarToken = async ( req, res = response) => {

    const { uid, name } = req;

    const token = await generarJWT( usuario.id, usuario.name );

    res.json({
        ok: true,
        uid,
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
}