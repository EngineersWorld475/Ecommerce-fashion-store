const express = require('express');
const router = express.Router();
const { addAddress, getAddress, updateAddress, deleteAddress } = require('../../controllers/shop/address-controller');

router.post('/add', addAddress);
router.get('/:userId', getAddress);
router.put('/:userId/:addressId', updateAddress);
router.delete('/:userId/:addressId', deleteAddress); 

module.exports = router;