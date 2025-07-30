import {configureStore} from '@reduxjs/toolkit'
import { currencyAPI } from '@/features/currencyAPI' 
import themeSlice from './slices/themeSlice'


const store = configureStore({
    reducer:{
        [currencyAPI.reducerPath]:currencyAPI.reducer, 
        theme: themeSlice, 
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(currencyAPI.middleware), 
})

export default store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;