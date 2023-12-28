import {configureStore} from '@reduxjs/toolkit'
import productReducer from './productSlice'
import filterReducer from './filterSlice'

const store = configureStore({
    reducer: {
        product: productReducer,
        filter: filterReducer,
    }
})

export default store;