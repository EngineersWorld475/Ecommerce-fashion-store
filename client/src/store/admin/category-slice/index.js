import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    listOfCategories: []
}

export const AddCategory = createAsyncThunk('/category/create-category', async (formData) => {
    const response = await axios.post('http://localhost:5000/api/admin/category/create-category', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response?.data
})

export const getCategories = createAsyncThunk('/category/get-categories', async () => {
    const response = await axios.get('http://localhost:5000/api/admin/category/get-categories')
    return response?.data
})

export const deleteCategory = createAsyncThunk('/category/delete-category', async (id) => {
    const response = await axios.delete(`http://localhost:5000/api/admin/category/delete-category/${id}`)
    return response?.data;
})

const AdminCategorySlice = createSlice({
    name: 'adminCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true
        }).addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listOfCategories = action.payload
        }).addCase(getCategories.rejected, async(state, action) => {
            state.isLoading = false
            state.listOfCategories = []
        })
    }
})

export default AdminCategorySlice.reducer