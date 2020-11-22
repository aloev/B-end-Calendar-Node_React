const { response } = require('express');
const { findById } = require('../models/Evento');
const Evento = require('../models/Evento');

const getEventos = async ( req, res = response) => {

    const eventos = await Evento.find()
                                    .populate('user','name');

    res.status(401).json({
        ok: true,
        eventos
    });
}
const crearEventos = async ( req, res = response) => {

    const evento = new Evento(req.body);

    try {
        
        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.json({
            ok: false,
            event: eventoGuardado
        })

    } catch (e) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con admin'
        })
    }

    
}
const actualizarEventos = async ( req, res = response) => {

    const eventoId = req.params.id;   // endpoint
    const uid = req.uid;             // token
    try {
        const evento = await Evento.findById(eventoId);

        if( !evento ){
            res.status(404).json({
                ok:false,
                msg: 'Evento no existe por ese id'
            })
        }

        // both user ids
        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok:false,
                msg: 'No tiene privilegios'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento
                                    .findByIdAndUpdate( eventoId, nuevoEvento , { new: true});

        res.json({
            ok: true,
            evento: eventoActualizado
        })
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok:false,
            msg: 'Hableee'
        })
    }



}
const deleteEvento = async ( req, res = response) => {

    const eventoId = req.params.id;   // endpoint
    const uid = req.uid;             // token
    try {
        const evento = await Evento.findById(eventoId);

        if( !evento ){
            res.status(404).json({
                ok:false,
                msg: 'Evento no existe por ese id'
            })
        }

        // both user ids
        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok:false,
                msg: 'No tiene privilegios'
            })
        }

        await Evento.findByIdAndDelete( eventoId );

        res.json({
            ok: true
        })
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok:false,
            msg: 'Hableee'
        })
    }
}


module.exports = {
    getEventos,
    crearEventos,
    actualizarEventos,
    deleteEvento
}