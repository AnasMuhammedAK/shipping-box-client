import { configureStore } from '@reduxjs/toolkit'
import orderSlice from '../slices/orderSlice'

const store = configureStore({
    reducer: {
        orders: orderSlice
    }
})
export default store