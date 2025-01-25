const User = require('../../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createError = require('../../utils/errorHandler')
const registerUser = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        // checking for existing email or username
        const existingUser = await User.findOne({ $or: [{ email }, { username }] })
        if (existingUser) {
            return next(createError(400, 'Email or username already exists'));
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save()
        res.status(200).send({
            success: true,
            message: 'user registered successfully'
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = { registerUser }