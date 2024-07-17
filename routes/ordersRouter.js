const express = require("express");
const ordersController = require("../controllers/ordersController");
const isLogin = require("../middlewares/isLogin");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();


router.get('/', ordersController.getAllOrders);
router.get('/:id', ordersController.getOneOrder);
router.delete('/:id', ordersController.deleteOrder);
router.put('/:id', ordersController.updateOrder);
router.post ('/',isLogin, ordersController.createOrder);
router.get('/sales/stats', ordersController.getOrderStatsCtrl);

module.exports = router
