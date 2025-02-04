import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductSlice from './admin/products-slice'
import AdminCategorySlice from './admin/category-slice'


const store = configureStore({
    reducer : {
        auth: authReducer,
        adminProducts: adminProductSlice,
        adminCategories: AdminCategorySlice
    }
})

export default store;