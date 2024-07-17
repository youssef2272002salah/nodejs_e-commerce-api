const express = require("express");
const productController = require("../controllers/productsController");
const isLogin = require("../middlewares/isLogin");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getOneProduct);

router.post('/',isLogin,isAdmin,productController.createProduct);
router.delete('/:id',isLogin,isAdmin,productController.deleteProduct);
router.put('/:id',isLogin,isAdmin,productController.updateProduct);

module.exports = router