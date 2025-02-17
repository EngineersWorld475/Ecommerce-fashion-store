const Product = require('../../models/Product');
const createError = require('../../utils/errorHandler');

const getFilteredProducts = async (req, res, next) => {
    try {
        const { category = [], brand = [], sortBy = 'price-lowtohigh' } = req.query;

        let filters = {};

        if (category.length) {
            filters.category = { $in: category.split(',') }
        }

        if (brand.length) {
            filters.brand = { $in: brand.split(',') }
        }
        let sort = {};

        switch (sortBy) {
            case 'price-lowtohigh':
                sort.price = 1;
                break;
            case 'price-hightolow':
                sort.price = -1;
                break;
            case 'title-atoz':
                sort.title = 1;
                break;
            case 'title-ztoa':
                sort.title = -1;
                break;
            default:
                break;
        }
        

        const products = await Product.find(filters).sort(sort);
        return res.status(200).json({
            success: true,
            data: products
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getProductDetails = async (req, res, next) => {
    try {
        const {id} = req.params;
        const currentProduct = await Product.findById(id);
        if(!currentProduct) {
            return next(createError(404, 'Product is not available'))
        }

        return res.status(200).json({
            success: true,
            data:currentProduct
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { getFilteredProducts, getProductDetails }