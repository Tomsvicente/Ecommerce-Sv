const { Router } = require("express");
const router = Router();

// métodos
const Contenedor = require("../class/container");
const file = new Contenedor();

// get all products

router.get("/", (req, res) => {
    let data = file.getAll();
    if (!data) {
        res.json({ error: "no hay productos" });
    }
    res.json(data);
});

// get product by id

router.get("/:id", (req, res) => {
    let data = file.getById(req.params.id);
    if (!data) {
        res.json({ error: "producto no encontrado" });
        // res.render('404.ejs')
    }
    res.json(data);
});

// post

router.post("/", (req, res) => {
    let data = file.save(req.body);
    if (!data) {
        res.status(400).send("Complete los campos restantes");
    }
    res.status(200).send(`Producto ${data.id} cargado exitosamente`);
});

// put

router.put("/:id", (req, res) => {
    let data = file.update(req.body, req.params.id);
    if (!data) {
        res.status(200).json(data);
    } else {
        res.status(304).json({ error: "producto no encontrado" });
    }
});

// delete

router.delete("/:id", (req, res) => {
    let data = file.deleteById(req.params.id);
    if (!data) {
        res.status(304).json({ error: "producto no encontrado" });
    }
    res.json(data)
});

module.exports = router;