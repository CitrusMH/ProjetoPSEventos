const express = require('express');
const Artista = require('../models/artista');
const utils = require('../utils/utilidades');

exports.getAll = (req, res, next) => {
    Artista.findAll({
        order: [
            ['nome', 'ASC']
        ]
    }).then(artistas => {
        res.render('artista/index', { artistas });
    });
}

exports.renderNovo = (req, res, next) => {
    res.render('artista/novo');
}

exports.create = (req, res, next) => {
    const nome = req.body.nome;
    const estilo = req.body.estilo;

    Artista.findOne({
        where: {
            nome : nome
        }
    }).then(artista => {
        if (artista == undefined) {
            Artista.create({
                nome : nome,
                estilo : estilo
            }).then(() => {
                res.redirect('/artistas');
            });
        } else {
            res.redirect('/artistas');
        }
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;

    Artista.findByPk(id).then(artista => {
        if (artista) {
            res.render('artista/editar', { artista });
        } else {
            res.redirect('/artistas');
        }
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const estilo = req.body.estilo;

    Artista.update({
        nome : nome,
        estilo : estilo
    }, {
        where: {
            id : id
        }
    }).then(() => {
        res.redirect('/artistas');
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Artista.destroy({
        where: {
            id : id
        }
    }).then(() => {
        res.redirect('/artistas');
    });
}
