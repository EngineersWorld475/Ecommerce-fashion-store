const express = require('express');
const { createCategory, findCategories, deleteCategory } = require('../../controllers/admin/category-controller');
const router = express.Router();

router.post('/create-category', createCategory);
router.get('/get-categories', findCategories);
router.delete('/delete-category/:id', deleteCategory)

module.exports = router