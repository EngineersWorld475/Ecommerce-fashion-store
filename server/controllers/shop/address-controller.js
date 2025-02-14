
const Address = require('../../models/Address');
const createError = require('../../utils/errorHandler');

// Add address
const addAddress = async (req, res, next) => {
    try {
        const { userId, address, pincode, phone, notes } = req.body;
        if (!userId || !address || !pincode || !phone || !notes) {
            return next(createError(400,'All fields are required'));
        }

        const newAddress = new Address({
            userId,
            address, 
            pincode,
            phone,
            notes
        });
        await newAddress.save();

        res.status(201).json({ success: true, message: 'Address added successfully', data: newAddress });
    } catch (error) {
        next(error);
    }
}

// Get address
const getAddress = async (req, res, next) => {
    const {userId} = req.params;

    if(!userId) {
        return next(createError(400, 'User id is required'));
    }

    const address = await Address.find({userId});
    return res.status(200).json({
        success: true,
        data: address
    });
}

// Update address
const updateAddress = async(req, res, next) => {
    try {
        const { address, pincode, phone, notes } = req.body;
        const { addressId, userId } = req.params; 
    
        if (!addressId || !userId || !address || !pincode || !phone || !notes) {
            return next(createError(400, 'All fields are required'));
        }
    if (!addressId || !userId || !address || !pincode || !phone || !notes) {
        return next(createError(400, 'All fields are required'));
    }
        const existingAddress = await Address.findOne({ _id: addressId, userId });
        if (!existingAddress) {
            return next(401, createError('Address not found'));
        }
    
        const updatedAddress = await Address.findOneAndUpdate(
            { _id: addressId, userId },
            { address, pincode, phone, notes },
            { new: true }
        );
    
        res.status(200).json({
            message: 'Address updated successfully',
            data: updatedAddress
        });
    } catch (error) {
        next(error);
    }
}

// Delete address
const deleteAddress = async (req, res, next) => {
    const { addressId, userId } = req.params;

    if (!addressId || !userId) {
        return next(createError(400, 'Address id and user id are required'));
    }

    const address = await Address.findOne({ _id: addressId, userId });
    if (!address) {
        return next(createError(401, 'Address not found'));
    }

    await Address.findOneAndDelete({ _id: addressId, userId });
    res.status(200).json({ success: true, message: 'Address deleted successfully' });
}

module.exports = { addAddress, getAddress, updateAddress, deleteAddress };