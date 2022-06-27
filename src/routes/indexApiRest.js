const { Router } = require("express");
const { getAll, getProductById, postProduct, putProduct, deleteProduct } = require("../controllers/apiRestController");
const router = Router(); 

router.get("/", getAll);
router.get("/:id", getProductById);
router.post("/", postProduct)
router.put("/:id", putProduct)
router.delete("/:id", deleteProduct)

module.exports = router;