const Category = require("../models/Category");


exports.createCategory = async (req, res) => {
    const { name } = req.body;
    console.log(name)
        const category = await Category.create({
            name: name.toLowerCase(),
            user: req.userAuthId
        });
        res.status(201).json({
            status: "success",
            data: {
                category
            }
        })
}
exports.getAllCategorys = async (req, res) => {
    const categorys = await Category.find();
    res.status(200).json({
        status: "success",
        data: {
            categories: categorys
        }
    })
}

exports.getOneCategory = async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: {
            category
        }
    })
}


exports.deleteCategory = async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: "success",
    })
}


exports.updateCategory = async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: "success",
        data: {
            category
        }
    })
}

module.exports = exports