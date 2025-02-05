const express = require('express');
const { getFilteredProducts } = require('../../controllers/shop/products-controller');
const router = express.Router()

router.get('/get-fiter-products', getFilteredProducts)

module.exports = router