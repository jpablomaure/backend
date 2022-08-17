const express = require('express');
const morgan = require('morgan');


// Instancia del servidor 

const app = express();
const routesProductos = require('./src/routes/productos.routes.js');

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

// Rutas

app.use('/api/productos' , routesProductos);
// app.use('/api/productos' , routesProductos);

// Servidor

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${server.address().port}`);
})

server.on('error', err => console.log(`Error en el servidor ${err}`));