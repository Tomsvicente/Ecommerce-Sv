const { Router } = require("express");
const router = Router(); 
const cartControllers = require("../controllers/cartControllers")

router.post("/", cartControllers.newCart);
router.delete("/:id/productos", cartControllers.deleteCartById);
router.get("/:id/productos", cartControllers.getAllProductsInCart);
router.post("/:id/productos", cartControllers.addProductsToCart);
router.delete("/:id/productos/:id_prod", cartControllers.deleteProductFromCartById);

module.exports = router;
