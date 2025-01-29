const { imageUploadUtil } = require("../../helpers/cloudinary");

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

module.exports = {handleImageUpload}