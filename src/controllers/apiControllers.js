const Contenedor = require("../models/Container");
const data = new Contenedor("./src/products.json");

const formView = (req, res) => {
  res.render("form");
};

const productsView = async (req, res) => {
  let products = await data.getAll();
  console.log(products)
  res.render("products", { products });
};

const formSubmit = (req, res) => {
  data.save(req.body);
  res.redirect("/productos");
};

module.exports = { formView, productsView, formSubmit };
