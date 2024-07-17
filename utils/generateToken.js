const jwt = require("jsonwebtoken");
generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "3d" });
};

module.exports = generateToken