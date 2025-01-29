const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name:'dxinpelyz',
    api_key: '628878616826986',
    api_secret: 'lBjdhKHUIkaP1i2PoT3br8qETlM'
})

const storage = new multer.memoryStorage()

const imageUploadUtil = async (file) => {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    })

    return result;
}

const upload = multer({storage})

module.exports = {upload, imageUploadUtil}