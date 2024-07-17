const express = require("express");
const categoriesController = require("../controllers/categoriesController");
const isLogin = require("../middlewares/isLogin");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

router.get('/', categoriesController.getAllCategorys);
router.get('/:id', categoriesController.getOneCategory);

router.post('/',isLogin,isAdmin,categoriesController.createCategory);
router.delete('/:id',isLogin,isAdmin,categoriesController.deleteCategory);
router.put('/:id',isLogin,isAdmin,categoriesController.updateCategory);

module.exports = router