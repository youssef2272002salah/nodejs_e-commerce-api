const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv")
dotenv.config();

// import routes 
const userRouter = require("./routes/userRouter")
const productRouter = require("./routes/productRouter")
const categoriesRouter = require("./routes/categoriesRouter")
const brandsRouter = require("./routes/brandsRouter")
const reviewsRouter = require("./routes/reviewsRouter")
const ordersRouter = require("./routes/ordersRouter")
const couponRouter = require("./routes/couponRouter")

dbConnect();
const app = express();
app.use(express.json());





// routes

app.use("/api/v1/users",userRouter)
app.use("/api/v1/products",productRouter)
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/brands", brandsRouter);
app.use("/api/v1/reviews", reviewsRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/coupons", couponRouter);



module.exports = app