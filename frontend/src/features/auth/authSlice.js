import { createSlice } from "@reduxjs/toolkit";

const initialAuth={user:{},isAuth:false}


const authSlice=createSlice({
    name:'auth',
    initialState:initialAuth,
    reducers:{
        setCredentials:(state,action)=>{
           
        
            state.user = action.payload.data;
            state.isAuth=true;
        },
        logOut:(state,action)=>{
            state.user = {}
            state.isAuth=false
        }
    }
})

export const authActions=authSlice.actions;

export default authSlice.reducer

