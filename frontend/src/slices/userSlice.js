import { createSlice } from "@reduxjs/toolkit"

const userState={
    userData:{},
    conversationsData: {},
}

const userSlice = createSlice({
    name:"userSlice",
    initialState:userState,
    reducers : {
        getUserAction : (state,action) => {
            state.userData=action.payload
        },
        getConversationsAction: (state,action) => {
            state.conversationsData= action.payload;
        }
    }
})

export const {getUserAction, getConversationsAction } = userSlice.actions

export const userReducer = userSlice.reducer