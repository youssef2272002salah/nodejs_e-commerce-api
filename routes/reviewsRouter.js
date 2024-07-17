const express = require("express");
const reviewController = require("../controllers/reviewsController");
const isLogin = require("../middlewares/isLogin");
const router = express.Router();

router.post('/:productID',isLogin,reviewController.createReview);

module.exports = router