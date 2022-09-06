import { createSlice } from "@reduxjs/toolkit"

const messageState = {
    message:'',
    code_msg:'',
    status:'initial',
}

const messageSlice = createSlice({
    name:"messageSlice",
    initialState:messageState,
    reducers: {
        messageResult: (state, action) => {
            state.message= action.payload.message;
            state.code_msg= action.payload.code_msg;
            state.status=action.payload.status;
        }
    }
})

export const { messageResult } = messageSlice.actions;

export const messageReducer = messageSlice.reducer