
import {createSlice} from '@reduxjs/toolkit'

const initialState={
status:false,
isLoading:false,
userinfo: null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        LoginUser(state,action){
            state.status=true
            state.isLoading=true
            state.userinfo=action.payload
            
        },

        LogOut(state,action){
           state.status=false,
           state.isLoading=false,
          state.userinfo=null
        }
    }
})

export const {LoginUser,LogOut}=authSlice.actions
export default authSlice.reducer