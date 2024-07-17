const Coupon = require("../models/Coupon");


exports.createCoupon = async (req, res) => {
    const { code, startDate, endDate, discount } = req.body;
    console.log(req.body);

    const couponsExists = await Coupon.findOne({
      code,
    });
    if (couponsExists) {
      throw new Error("Coupon already exists");
    }
    //check if discount is a number
    if (isNaN(discount)) {
      throw new Error("Discount value must be a number");
    }
    //create coupon
    const coupon = await Coupon.create({
      code: code,
      startDate,
      endDate,
      discount,
      user: req.userAuthId,
    });
    //send the response
    res.status(201).json({
      status: "success",
      message: "Coupon created successfully",
      coupon,
    });
  }


  exports.getAllCoupons = async (req, res) => {
    const coupons = await Coupon.find();
    res.status(200).json({
      status: "success",
      data: {
        coupons
      }
    })
  }


  exports.getOneCoupon = async (req, res) => {
    const coupon = await Coupon.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        coupon
      }
    })
  }


  exports.deleteCoupon = async (req, res) => {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
    })
  }


  exports.updateCoupon = async (req, res) => {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: "success",
      data: {
        coupon
      }
    })
  }
  