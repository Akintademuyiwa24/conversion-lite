import {configureStore} from '@reduxjs/toolkit'
// import currencySlice from './currencySlice'
import { currencyAPI } from '@/features/currencyAPI' // Importing the currencyAPI
import themeSlice from './slices/themeSlice' // Importing the themeSlice


const store = configureStore({
    reducer:{
        // currency : currencySlice,
        [currencyAPI.reducerPath]:currencyAPI.reducer, 
        theme: themeSlice, // Adding the themeSlice reducer
        // Adding the currencyAPI reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(currencyAPI.middleware), // Adding the currencyAPI middleware 
})

export default store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;