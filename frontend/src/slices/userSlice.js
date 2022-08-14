import { createSlice } from "@reduxjs/toolkit"

const userState={
    userData:{},
    conversationsData: {},
    conversationData: {},
    adminUsername:''
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
        },
        getConversationAction: (state,action) => {
            state.conversationData= action.payload;
        },
        getAdminUsernameAction: (state,action) => {
            state.adminUsername=action.payload
        }
    }
})

export const {getUserAction, getConversationsAction, getConversationAction, getAdminUsernameAction } = userSlice.actions

export const userReducer = userSlice.reducer