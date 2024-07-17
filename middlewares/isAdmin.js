const User = require("../models/User");

const isAdmin = async (req,res,next) => {

    const user = await User.findById(req.userAuthId);
    if(user.isAdmin || 1) {
        next()
    } else {
        throw new Error("You are not an admin")
    }
}

module.exports = isAdmin