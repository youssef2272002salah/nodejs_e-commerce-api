const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
{
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    orders :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ],
    wishlists:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"WishList"
        }
    ],
    isAdmin:{
        type:Boolean,
        default:false
    },
    hasShipingAddress:{
        type:Boolean,
        default:false
    },
    shippingAddress:{
            firstName:String,
            lastName:String,
            address:String,
            city:String,
            postalCode:String,
            province:String,
            country:String,
            phone:String
    }
},
{
    timestamps:true
}
);

const User = mongoose.model("User",UserSchema);
module.exports = User