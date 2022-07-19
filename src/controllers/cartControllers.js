const  Contenedor  = require('../models/Container');
const  Cart  = require('../models/Cart');
const productos = new Contenedor('./src/products.json');
const carts = new Contenedor('./src/carts.json');


// Crea un carrito y devuelve su id
const newCart = async (req, res) => {
  try {
      let id = await carts.save(new Cart);
      res.json(id);
  } catch (e) { 
      res.json({ error: e });
  }
}

// // Elimina un carrito según su id
const deleteCartById = async (req, res) => {
  try {
      const id = Number(req.params.id);
      const cart = await carts.getById(id);

      if (!cart) throw 'Carrito no encontrado';
      
      await carts.deleteById(id);
      res.json({message:'Carrito eliminado'});
  } catch (e) {
      res.json({ error: e });
  }
}

// Devuelve todos los productos de un carrito
const getAllProductsInCart = async (req, res) => {
  try {
      const id = Number(req.params.id);
      const cart = await carts.getById(id);

      if (!cart) throw 'Carrito no encontrado';

      res.json(cart.productos);
  } catch (e) { 
      res.json({ error: e });
  }
}

// Recibe y agrega un producto en el carrito
const addProductsToCart = async (req, res) => {
  try {
      const { id } = req.body;

      const id_cart = Number(req.params.id);
      const currentCart = await carts.getById(id_cart);

      if (!currentCart) throw 'Carrito no encontrado';

      const cart = new Cart;
      cart.updateCart(currentCart);

      if (!cart) throw 'Carrito no encontrado';

      const producto = await productos.getById(Number(id));
      if (!producto) throw 'Producto no encontrado';

      if (producto.stock == 0) throw 'No hay stock del producto';
      cart.addProduct(producto);

      await carts.updateById(id_cart, cart);
      res.json({message: 'Producto agregado al carrito'});

  } catch (e) {
      res.json({ error: e });
  }
}


// // Elimina un producto de un carrito según sus id
const deleteProductFromCartById = async (req, res) => {
  try {
      const id_cart = Number(req.params.id);
      const currentCart = await carts.getById(id_cart);

      if (!currentCart) throw 'Carrito no encontrado';
      
      const cart = new Cart;
      cart.updateCart(currentCart);
      
      const id = Number(req.params.id_prod);
      const producto = await cart.getById(id);

      if (!producto) throw 'Producto no se encuentra en el carrito';

      cart.removeProduct(producto);
      await carts.updateById(id_cart, cart);
      res.json({message: 'Producto eliminado'});

  } catch (e) {
      res.json({ error: e });
  }
}

module.exports = { newCart, deleteCartById, getAllProductsInCart, addProductsToCart, deleteProductFromCartById } 