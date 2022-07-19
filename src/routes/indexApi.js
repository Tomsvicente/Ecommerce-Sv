const { Router } = require("express");
const apiControllers = require("../controllers/apiControllers");
const router = Router(); //Router

router.get("/", apiControllers.formView);
router.get("/productos",apiControllers.productsView)
router.post("/productos", apiControllers.formSubmit);

module.exports = router;
