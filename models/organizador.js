const Sequelize = require('sequelize');
const connection = require('../database/database');

const Organizador = connection.define('organizadores', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Organizador.sync({force: true});

module.exports = Organizador;
