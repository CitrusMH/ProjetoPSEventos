const express = require('express');
const path = require('path');
const session = require('express-session');
const connection = require('./database/database');
const checkLogin = require('./middleware/checkLogin');

// Models
const Usuario = require('./models/usuario');
const Evento = require('./models/evento');
const Artista = require('./models/artista');
const Organizador = require('./models/organizador');
const Categoria = require('./models/categoria');

// Import de rotas
const usuarioRoute = require('./routes/usuarioRoute');
const categoriaRoute = require('./routes/categoriaRoute');
const artistaRoute = require('./routes/artistaRoute');
const organizadorRoute = require('./routes/organizadorRoute');
const eventoRoute = require('./routes/eventoRoute');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Sessions
app.use(session({
    secret: 'EventosArtApp',
    cookie: {
        maxAge: 1200000,
    },
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Banco de Dados
connection
    .authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso');
    })
    .catch(erro => {
        console.log('Erro ao conectar ao banco de dados.');
    });

// Rotas
app.use('/usuarios', usuarioRoute);
app.use('/categorias', categoriaRoute);
app.use('/artistas', artistaRoute);
app.use('/organizadores', organizadorRoute);
app.use('/eventos', eventoRoute);

app.get('/', checkLogin, (req, res, next) => {
    res.render('index');
});

app.use((req, res, next) => {
    res.render('404');
})

//Pinacolada@admin.com
//admin

module.exports = app;
