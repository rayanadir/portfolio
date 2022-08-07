import { createSlice } from "@reduxjs/toolkit"

const userState={
    userData:{},
}

const userSlice = createSlice({
    name:"userSlice",
    initialState:userState,
    reducers : {
        getUserAction : (state,action) => {
            state.userData=action.payload
        }
    }
})

export const {getUserAction} = userSlice.actions

export const userReducer = userSlice.reducer