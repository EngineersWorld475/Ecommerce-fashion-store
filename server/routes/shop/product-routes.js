const express = require('express');
const { getFilteredProducts, getProductDetails } = require('../../controllers/shop/products-controller');
const router = express.Router()

router.get('/get-fiter-products', getFilteredProducts)
router.get('/get-product-details/:id', getProductDetails)


module.exports = router