import { createSlice } from "@reduxjs/toolkit";

export const userSlice=createSlice({
    name:"user",
    initialState:{
        user:null,
        allUser:null,
        userToUser:null
    },
    reducers:{
        login:(state,action)=>{
            state.user=action.payload
        },
        logout:(state)=>{
            state.user=null
            state.allUser=null
            state.userToUser=null
        },
        allUser:(state,action)=>{
            state.allUser=action.payload
        },
        userToUser:(state,action)=>{
            state.userToUser=action.payload
        }
    }
})

export const {login,logout,allUser,userToUser}=userSlice.actions;
export const selectUser=(state)=>state.user.user;
export const selectAllUser=(state)=>state.user.allUser;
export const selectuserToUser=(state)=>state.user.userToUser;


export default userSlice.reducer;