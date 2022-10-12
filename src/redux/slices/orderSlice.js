import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseURL } from '../../utils/baseURL'
import axios from 'axios'

// Create  order Action
export const createOrderAction = createAsyncThunk("order/create",
    async (formData, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await axios.post(`${baseURL}/api/order`, formData)
            return data
        } catch (error) {
            if (!error?.response) throw error
            let message = (error?.response?.data?.message) ? (error?.response?.data?.message) : (error?.response?.data)
            return rejectWithValue(message)
        }
    })
// Create  order Action
export const fetchOrdersAction = createAsyncThunk("order/fetch-all",
    async (_, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await axios.get(`${baseURL}/api/order`)
            return data
        } catch (error) {
            if (!error?.response) throw error
            let message = (error?.response?.data?.message) ? (error?.response?.data?.message) : (error?.response?.data)
            return rejectWithValue(message)
        }
    })
//create slices
const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: []
    },
    extraReducers: builder => {
        //create
        builder
            // Create  order 
            .addCase(createOrderAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createOrderAction.fulfilled, (state, action) => {
                state.orders.push(action?.payload)
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(createOrderAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload
                state.serverErr = action?.error?.message;
            })
            //fetch the orders
            .addCase(fetchOrdersAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchOrdersAction.fulfilled, (state, action) => {
                state.orders = action?.payload
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(fetchOrdersAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload
                state.serverErr = action?.error?.message;
            })
    },
});
export default orderSlice.reducer;