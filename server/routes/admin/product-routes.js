const express  = require('express');
const { handleImageUpload, deleteProduct, addProduct, fetchProducts, updateProduct } = require('../../controllers/admin/product-controller');
const { upload } = require('../../helpers/cloudinary');

const router = express.Router();
router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add-product", addProduct)
router.get("/get-products", fetchProducts);
router.put("/edit-product/:id", updateProduct)
router.delete("/delete-product/:id", deleteProduct);
module.exports = router;