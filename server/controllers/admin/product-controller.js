const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");
const createError = require("../../utils/errorHandler");

const handleImageUpload = async (req, res) => {
    try {
        // Converts the image buffer (stored in req.file.buffer by Multer) to a base64-encoded string.
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        // Constructs a data URL using the MIME type (req.file.mimetype) and base64-encoded data.
        const url = "data:" + req.file.mimetype + ';base64,' + b64;
        // Calls imageUploadUtil(url) to upload the image to Cloudinary.
        const result = await imageUploadUtil(url)
        // Responds with a success message and the upload result, typically containing the secure image URL and other metadata.
        res.json({
            success: true,
            result
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: 'Error occured'
        })
    }
}

// add a new product

const addProduct = async (req, res, next) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
        if (!image || !title || !description || !category || !brand || !price || !salePrice || !totalStock) {
            return next(createError(400, 'Please provie all the fields'))
        }

        const newProduct = new Product({
            image, title, description, category, brand, price, salePrice, totalStock
        });
        await newProduct.save();
        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            data: newProduct
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

// fetch all product 

const fetchProducts = async (req, res, next) => {
    try {
        const listOfProducts = await Product.find({});
        res.status(200).json({
            success: true,
            data: listOfProducts
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

// edit a product

const updateProduct = async (req, res, next) => {
    try {
        const {id} = req.params;
        const findProduct = await Product.findById(id);
        if(!findProduct) {
           return next(createError(404, 'selected product is not available'))
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            {new: true, runValidators: true}
        )

        res.status(200).json({
            success: true,
            data: updatedProduct
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = { handleImageUpload }