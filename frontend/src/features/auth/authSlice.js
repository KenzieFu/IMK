import { createSlice } from "@reduxjs/toolkit";

const initialAuth={user:[],isAuth:false}


const authSlice=createSlice({
    name:'auth',
    initialState:initialAuth,
    reducers:{
        setCredentials:(state,action)=>{
            console.log(action.payload.data)
            state.user = action.payload.data;
            state.isAuth=true;
        },
        logOut:(state,action)=>{
            state.user = null
            state.isAuth=false
        }
    }
})

export const authActions=authSlice.actions;

export default authSlice.reducer

