const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Address', AddressSchema)