const Brand = require("../models/Brand");


exports.createBrand = async (req, res) => {
    const { name } = req.body;
    console.log(name)
        const brand = await Brand.create({
            name: name.toLowerCase(),
            user: req.userAuthId
        });
        res.status(201).json({
            status: "success",
            data: {
                brand
            }
        })
}
exports.getAllBrands = async (req, res) => {
    const brands = await Brand.find();
    res.status(200).json({
        status: "success",
        data: {
            brands
        }
    })
}

exports.getOneBrand = async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: {
            brand
        }
    })
}


exports.deleteBrand = async (req, res) => {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: "success",
    })
}


exports.updateBrand = async (req, res) => {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: "success",
        data: {
            brand
        }
    })
}

module.exports = exports