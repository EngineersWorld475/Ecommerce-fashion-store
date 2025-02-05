import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: []
}

export const fetchAllFiteredProducts = createAsyncThunk('/shop/get-filter-products', async() => {
    const response = await axios.get('http://localhost:5000/api/shop/products/get-fiter-products')
    return response?.data
})

const shoppingProductSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllFiteredProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllFiteredProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload.data;
        }).addCase(fetchAllFiteredProducts.rejected, (state) => {
            state.isLoading = false;
            state.productList = [];
        })
    }
})

export default shoppingProductSlice.reducer