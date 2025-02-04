const Category = require("../../models/Category");
const createError = require("../../utils/errorHandler");

// create category
const createCategory = async (req, res, next) => {
    try {
        const { categoryName } = req.body;
        if (!categoryName) {
            return next(createError(400, 'Category name is required'))
        }

        const newCategory = new Category({
            categoryName
        })
        await newCategory.save();
        res.status(200).json({
            success: true,
            message: 'Category added successfully',
            newCategory
        })
    } catch (error) {
        next(error)
    }
}

// fetch categories
const findCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({});

    res.status(200).json({
        success: true,
        categories
    })
    } catch (error) {
        next(error)
    }
}

// Delete categories
const deleteCategory = async (req, res, next) => {
    try {
        const {id} = req.params;
        const existingCategory = await Category.find({id});
        if(!existingCategory) {
            return next(createError(400, 'Category does not exist'))
        }
        const deletedCategory = await Category.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
            deletedCategory
        })
    } catch (error) {
        next(error)
    }
}
 
module.exports = { createCategory, findCategories, deleteCategory }