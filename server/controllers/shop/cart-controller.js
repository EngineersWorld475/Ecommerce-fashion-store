const createError = require("../../utils/errorHandler");
const Product = require('../../models/Product');
const Cart = require("../../models/Cart");

const addToCart = async (req, res, next) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return next(createError(400, 'Please provide valid data'))
        }

        const product = await Product.findById(productId);

        if (!product) {
            return next(createError(404, 'Product not found'))
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] })
        }

        findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (findCurrentProductIndex === -1) {
            cart.items.push({ productId, quantity })
        } else {
            cart.items[findCurrentProductIndex].quantity += quantity
        }

        await cart.save()

        return res.status(200).json({
            success: true,
            data: cart
        })
    } catch (error) {
        next(error)
    }
}

const fetchCartItems = async (req, res, next) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return next(createError(400, 'User id is required'))
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: 'item.productId',
            select: "image title price salePrice"
        })

        if (!cart) {
            return next(createError(404, 'Cart not found'))
        }

        // if user added an item into the cart and in admin side, admin delete that item. so this scenario needs to be considered
        const validItems = cart.items.filter(productItem => productItem.productId);
        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save()
        }

        const populateCartItems = validItems.map(item => ({
            productId: item.productId,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.pice,
            salePrice: item.productId.salePrice,
            quantity: item.quantity
        }))

        return res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })

    } catch (error) {
        next(error)
    }
}

const updateCartItemQty = async (req, res, next) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return next(createError(400, 'Please provide valid data'))
        }

        const cart = await Cart.findOne({ userId })
        if (!cart) {
            return next(createError(404, 'Cart not found'))
        }

        const findCurrentProductIndex = cart.items.findIndex((item) => item.productId.toString === productId)

        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not present !'
            })
        }

        cart.items[findCurrentProductIndex].quantity = quantity;
        await cart.save();

        await Cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        })

        const populatedCartItems = cart.items.map((item) => (
            {
                productId: item.productId ? item.productId._id : null,
                image: item.productId ? item.productId.image : null,
                title: item.productId ? item.productId.title : null,
                price: item.productId ? item.productId.price : null,
                salePrice: item.productId ? item.productId.salePrice : null,
                quantity: item.quantity ? item.quantity : null
            }
        ))

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populatedCartItems
            }
        })
    } catch (error) {
        next(error)
    }
}

const deleteCartItem = async (req, res, next) => {
    try {
        const {userId, productId} = req.params;
        if (!userId || !productId) {
            return next(createError(400, 'Invalid data provided'))
        }

        const cart = await Cart.findOne({userId}).populate({
            path: "items.productId",
            select: "image title price salePrice"
        })

        if(!cart) {
            return next(createError(404, 'Cart not found'))
        }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId);

        await cart.save();

        await Cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        })

        const populatedCartItems = cart.items.map((item) => (
            {
                productId: item.productId ? item.productId._id : null,
                image: item.productId ? item.productId.image : null,
                title: item.productId ? item.productId.title : null,
                price: item.productId ? item.productId.price : null,
                salePrice: item.productId ? item.productId.salePrice : null,
                quantity: item.quantity ? item.quantity : null
            }
        )) 

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populatedCartItems
            }
        })

    } catch (error) {
        next(error)
    }
}


module.exports = {addToCart, fetchCartItems, updateCartItemQty, deleteCartItem

}