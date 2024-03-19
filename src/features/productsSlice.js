import React from 'react'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async()=>{
            const respond = await axios.get("http://127.0.0.1:3000/api/v1/menu_items");
            return respond?.data;
    }
)

const initialState = {
    items: [],
    status: null,
    error: null
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(productsFetch.pending, (state) => {
                state.status = "Pending";
            })
            .addCase(productsFetch.fulfilled, (state, action) => {
                state.status = "Success";
                state.items = action.payload;
            })
            .addCase(productsFetch.rejected, (state) => {
                state.status = "Rejected";
            });
    }
}) 

export default productSlice.reducer;