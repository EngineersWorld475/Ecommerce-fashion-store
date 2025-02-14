import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAddressLoading: false,
    addressList: []
};


export const createAddress = createAsyncThunk('address/createAddress', async (formData) => {
    const response = await axios.post(`http://localhost:5000/api/shop/address/add`, formData);
    return response.data;
});

export const fetchAddress = createAsyncThunk('address/fetchAddress', async (userId) => {
    const response = await axios.get(`http://localhost:5000/api/shop/address/${userId}`);
    return response.data;
});

export const updateAddress = createAsyncThunk('address/updateAddress', async ({ userId, addressId, formData }) => {
    const response = await axios.put(`http://localhost:5000/api/shop/address/${userId}/${addressId}`, formData);
    return response.data;
});

export const deleteAddress = createAsyncThunk('address/deleteAddress', async ({ userId, addressId }) => {
    const response = await axios.delete(`http://localhost:5000/api/shop/address/${userId}/${addressId}`);
    return response.data;
});

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAddress.pending, (state) => {
            state.isAddressLoading = true;
        }).addCase(createAddress.fulfilled, (state, action) => {
            state.isAddressLoading = false;
            state.addressList = action.payload.data;
        }).addCase(createAddress.rejected, (state) => {
            state.isAddressLoading = false;
            state.addressList = [];
        }).addCase(fetchAddress.pending, (state) => {
            state.isAddressLoading = true;
        }).addCase(fetchAddress.fulfilled, (state, action) => {
            state.isAddressLoading = false;
            state.addressList = action.payload.data;
        }).addCase(fetchAddress.rejected, (state) => {
            state.isAddressLoading = false;
            state.addressList = [];
        }).addCase(updateAddress.pending, (state) => {
            state.isAddressLoading = true;
        }).addCase(updateAddress.fulfilled, (state, action) => {
            state.isAddressLoading = false;
            state.addressList = action.payload.data;
        }).addCase(updateAddress.rejected, (state) => {
            state.isAddressLoading = false;
            state.addressList = [];
        }).addCase(deleteAddress.pending, (state) => {
            state.isAddressLoading = true;
        }).addCase(deleteAddress.fulfilled, (state, action) => {
            state.isAddressLoading = false;
            state.addressList = action.payload.data;
        }).addCase(deleteAddress.rejected, (state) => {
            state.isAddressLoading = false;
            state.addressList = [];
        })
    }
});

export default addressSlice.reducer;