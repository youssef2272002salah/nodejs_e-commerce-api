const express = require("express");
const brandController = require("../controllers/brandsController");
const isLogin = require("../middlewares/isLogin");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

router.get('/', brandController.getAllBrands);
router.get('/:id', brandController.getOneBrand);

router.post('/',isLogin,isAdmin,brandController.createBrand);
router.delete('/:id',isLogin,isAdmin,brandController.deleteBrand);
router.put('/:id',isLogin,isAdmin,brandController.updateBrand);

module.exports = router