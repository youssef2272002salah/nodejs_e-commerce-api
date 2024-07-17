const express = require("express");
const userController = require("../controllers/userController");
const isLogin = require("../middlewares/isLogin");
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', isLogin,userController.profile);


module.exports = router