import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
//Redux
import userReducer from './user'

//RTK Query
import { categoryApi } from '../services/categoryApi'
import { bookApi } from '../services/bookApi';


export const store = configureStore({
    reducer:{
        user: userReducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [bookApi.reducerPath]: bookApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(categoryApi.middleware, bookApi.middleware),
   
});

setupListeners(store.dispatch);