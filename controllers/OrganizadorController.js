const express = require('express');
const Organizador = require('../models/organizador');

exports.getAll = (req, res, next) => {
    Organizador.findAll({
        order: [['nome', 'ASC']]
    }).then(organizadores => {
        res.render('organizador/index', { organizadores });
    });
}

exports.renderNovo = (req, res, next) => {
    res.render('organizador/novo');
}

exports.create = (req, res, next) => {
    const nome = req.body.nome;

    Organizador.findOne({
        where: { nome : nome }
    }).then(organizador => {
        if (!organizador) {
            Organizador.create({
                nome : nome
            }).then(() => {
                res.redirect('/organizadores');
            });
        } else {
            res.redirect('/organizadores');
        }
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;
    
    Organizador.findByPk(id).then(organizador => {
        if (organizador) {
            res.render('organizador/editar', { organizador });
        } else {
            res.render('404');
        }
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const nome = req.body.nome;

    Organizador.update({
        nome : nome
    }, {
        where: { id : id }
    }).then(() => {
        res.redirect('/organizadores');
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Organizador.destroy({
        where: { id }
    }).then(() => {
        res.redirect('/organizadores');
    });
}
