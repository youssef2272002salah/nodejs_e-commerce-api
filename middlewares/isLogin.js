const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

isLogin = async (req,res,next) => {
    const token = getTokenFromHeader(req)
    const decoded = verifyToken(token)
    if(decoded) {
        req.userAuthId = decoded?.id
        next()
    } else {
        throw new Error("Invalid/Expired token, please login again");
    }
}

module.exports = isLogin