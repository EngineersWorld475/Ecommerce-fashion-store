import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: true,
    productDetails: []
}


export const fetchProductDetails = createAsyncThunk('/shop/get-product-details', async (id) => {
    const response = await axios.get(`http://localhost:5000/api/shop/products/get-product-details/${id}`);
    return response?.data
})

const shoppingProductDetailsSlice = createSlice({
    name: 'shoppingProductDetiails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductDetails.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productDetails = action.payload.data;
        }).addCase(fetchProductDetails.rejected, (state) => {
            state.isLoading = false;
            state.productDetails = [];
        })
    }
})

export default shoppingProductDetailsSlice.reducer