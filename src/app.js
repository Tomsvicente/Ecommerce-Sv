const express = require("express");
const app = express();
const indexApiRest = require("./routes/products");
const indexApi = require("./routes/indexApi");
const indexApiCart = require("./routes/cart")
const adminRoutes = require("./routes/adminRoutes")
const path = require("path");
const { engine } = require("express-handlebars");

// handlebars settings
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: path.join(__dirname, "./views/layout/main.hbs"),
    layoutsDir: path.join(__dirname, "./views/layout"),
    partialsDir: path.join(__dirname, "./views/partials"),
  })
);

// settings
app.set("port", process.env.PORT || 8080);
app.set("json spaces", 2);
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "hbs");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// routes
app.use("/", indexApi);
app.use("/api/carrito", indexApiCart);
app.use("/api/productos", indexApiRest);
app.use("/admin", adminRoutes);

// static
app.use(express.static(path.join(__dirname, "../public")));

// 404 handler
app.use((req, res) => {
  res.render("404");
});

//

module.exports = app;
