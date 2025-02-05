const Product = require('../../models/Product');

const getFilteredProducts = async(req, res, next) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({
            success: true,
            data: products
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {getFilteredProducts}