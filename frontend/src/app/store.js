import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

import authreducer from "../features/auth/authSlice"

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authreducer
    },
    middleware:getDefaultMiddleware=> getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})