import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    listOfProducts: []
}

export const addNewProduct = createAsyncThunk('/products/addNewProduct', async (formData) => {
    const response = await axios.post('http://localhost:5000/api/admin/products/add-product', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response?.data;
})

export const getProducts = createAsyncThunk('/products/get-products', async () => {
    const response = await axios.get('http://localhost:5000/api/admin/products/get-products');
    return response?.data
})

export const editProduct = createAsyncThunk('/products/edit-product', async ({ formData, id }) => {
    const response = await axios.put(`http://localhost:5000/api/admin/products/edit-product/${id}`, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data
})

export const deleteProduct = createAsyncThunk('/products/delete-product', async (id) => {
    const response = await axios.delete(`http://localhost:5000/api/admin/products/delete-product/${id}`)
    return response.data
})

const AdminProductSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listOfProducts = action.payload;
        }).addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.listOfProducts = []
        })
    }
})

export default AdminProductSlice.reducer