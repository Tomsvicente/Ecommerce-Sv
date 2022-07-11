const { Router } = require('express');
const router = Router();
// const path = require('path');

const products = require('./productos.js');
const cart = require('./carrito.js');

router.use('/productos', products);
router.use('/carrito', cart);

module.exports = router;