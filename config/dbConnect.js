const mongoose = require('mongoose')
const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.DATABASE)
        console.log("database connected successfully\n ----------------------------------------------------")
    }
    catch (err){
        console.log(err)
        process.exit(1)
    };
};

module.exports = dbConnect