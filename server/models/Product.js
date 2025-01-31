const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    image: {
        type: String
    },
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'Category',
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    totalStock: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Product', ProductSchema)