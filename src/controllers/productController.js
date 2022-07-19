const  Contenedor  = require('../models/Container');
const  Producto  = require('../models/Product');

// Base de productos
const productos = new Contenedor('../products.json');

// Devuelve todos los productos
const getAll = async (req, res) => {
    try {
        res.json(await productos.getAll());
    } catch (e) { 
        res.status(500).json({ error: e });
    }
}

// Devuelve un producto según su id
const getProductById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const producto = await productos.getById(id);

        if (!producto) throw 'producto no encontrado';
        res.status(200).json(producto);

    } catch (e) { 
        res.status(500).json({ error: e });
    }
}

// Recibe y agrega un producto, lo devuelve con su id asignado
const postProduct = async (req, res) => {
    try {
        const { title, description, thumbnail, price, stock, code } = req.body;
        const producto = new Producto( title, description, thumbnail, +(price), +(stock), code );
        let id = await productos.save(producto);

        res.status(201).json(id);
    } catch (e) { 
        res.status(500).json({ error: e });
    }
}

// Recibe y actualiza un producto segun su id
const putProduct = async (req, res) => {
    try {
        const { title, description, thumbnail, price, stock, code } = req.body;
        const id = Number(req.params.id);
        const producto = await productos.getById(id);

        if (!producto) throw 'producto no encontrado';

        productoModif = new Producto( title, description, thumbnail, Number(price), Number(stock), code );
        await productos.updateById(id, productoModif);
        res.status(200).json('Producto modificado');

    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Elimina un producto según su id
const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const producto = await productos.getById(id);

        if (!producto) throw 'producto no encontrado';
        
        await productos.deleteById(id);
        res.status(200).json('Producto eliminado');

    } catch (e) {
        res.status(500).json({ error: e });
    }
}

module.exports = {
  getAll,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
};
