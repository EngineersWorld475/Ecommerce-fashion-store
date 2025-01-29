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

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email })

        if (!existingUser) { 
            return next(createError(400, 'user is not registered'))
        }

        const checkPassword = bcrypt.compareSync(password, existingUser.password);
        console.log('...checkPassword', checkPassword)
        if (!checkPassword) {
            return next(createError(401, 'please enter the correct password'))
        }

        const token = jwt.sign({ id: existingUser._id, role: existingUser.role, email: existingUser.email }, process.env.CLIENT_SECRET_KEY, { expiresIn: '1d' })

        res.cookie('token', token, { httpOnly: true, secure: false }).json({
            success: true,
            message: 'User login successfully',
            user: {
                email: existingUser.email,
                role: existingUser.role, 
                id: existingUser._id
            }
        })
    } catch (error) {
        next(error)
    }
}

const logoutUser = (req, res) => {
   return  req.clearCookie('token').json({
        message: "User logout successfully"
    })
}


module.exports = { registerUser, loginUser,logoutUser }