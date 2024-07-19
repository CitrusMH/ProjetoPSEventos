const express = require('express');
const Categoria = require('../models/categoria');

exports.getAll = (req, res, next) => {
    Categoria.findAll({
        order: [
            ['tipo', 'ASC']
        ]
    }).then(categorias => {
        res.render('categoria/index', { categorias });
    });
}

exports.renderNovo = (req, res, next) => {
    res.render('categoria/novo');
}

exports.create = (req, res, next) => {
    const tipo = req.body.tipo;
    Categoria.findOne({
        where: {
            tipo: tipo
        }
    }).then(cat => {
        console.log(cat);
        if (cat == undefined) {
            Categoria.create({
                tipo: tipo
            }).then(() => {
                res.redirect('/categorias');
            });
        } else {
            res.redirect('/categorias');
        }
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;

    Categoria.findByPk(id).then(categoria => {
        res.render('categoria/editar', { categoria });
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const tipo = req.body.tipo;

    Categoria.update({
        tipo : tipo
    }, {
        where: {
            id : id
        }
    }).then(() => {
        res.redirect('/categorias');
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Categoria.destroy({
        where: {
            id
        }
    }).then(() => {
        res.redirect('/categorias');
    });
}
