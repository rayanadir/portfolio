import { createSlice } from "@reduxjs/toolkit"

const userState={
    userData:{},
    conversationsData: [],
    conversationData: {},
    adminUsername:'',
    messageState:'',
    conversationId:''
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
            state.adminUsername=action.payload;
        },
        sendMessageAction: (state, action) => {
            state.messageState=action.payload;
        },
        leaveConversation: (state) => {
            state.messageState='';
        }
        ,logoutUserSliceAction : (state) => {
            state.adminUsername="";
            state.conversationData={};
            state.conversationsData={};
            state.userData={};
        },
        setConversationIdAction : (state,action)=> {
            state.conversationId= action.payload;
        }
    }
})

export const {
    getUserAction, 
    getConversationsAction, 
    getConversationAction, 
    getAdminUsernameAction, 
    logoutUserSliceAction, 
    leaveConversation, 
    sendMessageAction,
    setConversationIdAction, 
} = userSlice.actions

export const userReducer = userSlice.reducer