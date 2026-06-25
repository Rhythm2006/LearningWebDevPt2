// S1
import {configureStore} from '@reduxjs/toolkit'
// S5
import todoReducer from '../features/todo/todoSlice'

export const store = configureStore({
    reducer: todoReducer
});