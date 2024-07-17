const express = require("express");
const couponController = require("../controllers/couponController");
const isLogin = require("../middlewares/isLogin");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();


router.get('/', couponController.getAllCoupons);
router.get('/:id', couponController.getOneCoupon);

router.post('/',isLogin,isAdmin,couponController.createCoupon);
router.delete('/:id',isLogin,isAdmin,couponController.deleteCoupon);
router.put('/:id',isLogin,isAdmin,couponController.updateCoupon);

module.exports = router