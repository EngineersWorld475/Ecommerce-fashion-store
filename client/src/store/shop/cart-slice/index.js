import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isCartLoading: false,
    cartItems: []
}


export const addToCart = createAsyncThunk('cart/addCartItems', async ({ userId, productId, quantity }) => {
    const response = await axios.post(`http://localhost:5000/api/shop/cart/add`, {
        userId,
        productId,
        quantity
    })
    return response.data;
});

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (userId) => {
    const response = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`)
    return response.data;
});

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async ({ userId, productId }) => {
    const response = await axios.delete(`http://localhost:5000/api/shop/cart/${userId}/${productId}`);
    return response.data;
});

export const updateCart = createAsyncThunk('cart/updateCart', async ({ userId, productId, quantity }) => {
    const response = await axios.put('http://localhost:5000/api/shop/cart/update-cart', {
        userId,
        productId,
        quantity
    }
    )
    return response.data;
})

const shoppingCartSlice = createSlice({
    name: 'ShoppingCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.isCartLoading = true;
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.isCartLoading = false;
            state.cartItems = action.payload.data
        }).addCase(addToCart.rejected, (state, action) => {
            state.isCartLoading = false;
            state.cartItems = [];
        }).addCase(fetchCartItems.pending, (state) => {
            state.isCartLoading = true;
        }).addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isCartLoading = false;
            state.cartItems = action.payload.data
        }).addCase(fetchCartItems.rejected, (state, action) => {
            state.isCartLoading = false;
            state.cartItems = [];
        }).addCase(updateCart.pending, (state) => {
            state.isCartLoading = true;
        }).addCase(updateCart.fulfilled, (state, action) => {
            state.isCartLoading = false;
            state.cartItems = action.payload.data
        }).addCase(updateCart.rejected, (state, action) => {
            state.isCartLoading = false;
            state.cartItems = [];
        }).addCase(deleteCartItem.pending, (state) => {
            state.isCartLoading = true;
        }).addCase(deleteCartItem.fulfilled, (state, action) => {
            state.isCartLoading = false;
            state.cartItems = action.payload.data
        }).addCase(deleteCartItem.rejected, (state, action) => {
            state.isCartLoading = false;
            state.cartItems = [];
        })
    }
})

export default shoppingCartSlice.reducer;