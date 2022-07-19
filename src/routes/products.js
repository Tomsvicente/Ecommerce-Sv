const { Router } = require("express");
const apiRestControllers = require("../controllers/productController");
const router = Router(); 

router.get("/", apiRestControllers.getAll);
router.get("/:id", apiRestControllers.getProductById);

module.exports = router;
