import { createSlice } from "@reduxjs/toolkit";

export const userSlice=createSlice({
    name:"user",
    initialState:{
        user:null,
        allUser:null,
        user2user:null
    },
    reducers:{
        login:(state,action)=>{
            state.user=action.payload
        },
        logout:(state)=>{
            state.user=null
            state.allUser=null
        },
        allUser:(state,action)=>{
            state.allUser=action.payload
        },
        user2user:(state,action)=>{
            state.user2user=action.payload
        }
    }
})

export const {login,logout,allUser}=userSlice.actions;
export const selectUser=(state)=>state.user.user;
export const selectAllUser=(state)=>state.user.allUser;
export const selectUser2User=(state)=>state.user.user2user;


export default userSlice.reducer;