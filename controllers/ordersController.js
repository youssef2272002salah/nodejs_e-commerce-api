const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Products");
const Stripe = require("stripe")
const dotenv = require("dotenv")
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


exports.createOrder = async (req, res) => { 
    const { orderItems, shippingAddress, totalPrice } = req.body;
    //Find the user

    const user = await User.findById(req.userAuthId);

    const order = await Order.create({
      user: user?._id,
      orderItems,
      shippingAddress,
      totalPrice,
    });

    const convertedOrders = orderItems.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item?.name,
            description: item?.description,
          },
          unit_amount: item?.price * 100,
        },
        quantity: item?.qty,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: convertedOrders,
      metadata: {
        orderId: JSON.stringify(order?._id),
      },
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
    res.send({ url: session.url });
  };
  
  exports.getAllOrders = async (req, res) => {
    const orders = await Order.find();
    res.status(200).json({
      status: "success",
      data: {
        orders
      }
    })
  }

  exports.getOneOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        order
      }
    })
  }


  exports.deleteOrder = async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
    })
  }


  exports.updateOrder = async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: "success",
      data: {
        order
      }
    })
  }



  exports.getOrderStatsCtrl = async (req, res) => {
    //get order stats
    console.log(req.userAuthId)
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          minimumSale: {
            $min: "$totalPrice",
          },
          totalSales: {
            $sum: "$totalPrice",
          },
          maxSale: {
            $max: "$totalPrice",
          },
          avgSale: {
            $avg: "$totalPrice",
          },
        },
      },
    ]);
    //get the date
    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const saleToday = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: today,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);
    //send response
    res.status(200).json({
      success: true,
      message: "Sum of orders",
      orders,
      saleToday,
    });
  };
