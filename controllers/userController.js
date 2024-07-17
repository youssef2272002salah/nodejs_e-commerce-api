const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
exports.register = async (req, res) => {
    
    const { fullname, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
        return res.status(400).json({
            status: "fail",
            message: "User already exists"
        })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            status: "success",
            message: "User Registered Successfully",
            data: {
                newUser
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error
        })
    }
}

exports.login = async (req,res)=>{

    try {
        const user = await User.findOne({email:req.body.email});
        if(!user) {
            return res.status(401).json({
                status: "fail",
                message: "User not found"
            })
        } else {      
            console.log(user._id)      
            res.status(200).json({
                status: "success",
                data: {
                    user
                },
               token: generateToken(user._id)
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error
        })
    }
} 

exports.profile= async(req,res)=>{
    try {
        console.log(req.userAuthId)
        const user = await User.findById(req.userAuthId);
        console.log(user)
        res.status(200).json({
            status: "success",
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error
        })
    }
}
