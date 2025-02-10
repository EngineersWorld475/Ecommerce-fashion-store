import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductSlice from './admin/products-slice'
import AdminCategorySlice from './admin/category-slice'
import shopProductSlice from './shop/product-slice'
import shoppingProductDetailsSlice from './shop/product-details-slice'
import shoppingCartSlice from './shop/cart-slice/index'


const store = configureStore({
    reducer : {
        auth: authReducer,
        adminProducts: adminProductSlice,
        adminCategories: AdminCategorySlice,
        shoppingProducts: shopProductSlice,
        shoppingProductDetails: shoppingProductDetailsSlice,
        ShoppingCart: shoppingCartSlice
    }
})

export default store;