const express = require('express');
const routesProductos = express.Router();

/*Productos*/
const DB_PRODUCTOS = [];

routesProductos.get('/:id', (req, res)=>{
    try {
        const id = req.params.id;
        
        const indexObj = DB_PRODUCTOS.findIndex((o) => o.id == id);

        if (indexObj == -1 ){
            res.status(404).json({code: 404, msg: `Producto con ${id} no encontrado`})
        }
        res.status(200).json(DB_PRODUCTOS[indexObj])
    } catch (error) {
        console.log(error)
        res.status(500).json({code: 500, msg: `Error al obtener ${req.method} ${req.url}`})
    }
    res.status(200).json(DB_PRODUCTOS);
});

routesProductos.post('/', (req, res)=>{
    let nuevoProducto = req.body;
    let nuevoId=0;
    if (nuevoProducto.length == 0) {
        nuevoId = 1;
    } else {
        nuevoId = req.body[req.body.length - 1] +1;
    }

    nuevoProducto = {id: nuevoId, ...nuevoProducto};
    console.log(nuevoProducto);
    DB_PRODUCTOS.push(nuevoProducto);
    res.status(201).json({msg: 'Agregado!', data: nuevoProducto});
});

routesProductos.put('/:id' , (req, res) =>{
    let productoAct = req.body;
    try {
        const id = req.params.id;
        console.log(`la id es ${id}`)
        const indexObj = DB_PRODUCTOS.findIndex((o)=> o.id == id);

        if (indexObj == -1) {
            res.status(404).json({code: 404, msg: `Producto ${id} no encontrado`})
        } 
        productoAct[indexObj] = {id, ...req.body}
        res.status(200).json(DB_PRODUCTOS[indexObj]);
    } catch (error) {
        console.log(error)
        res.status(500).json({code: 500, msg: `Error al obtener ${req.method} ${req.url}`});
    }
});


module.exports = routesProductos;
