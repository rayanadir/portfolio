import { createSlice } from "@reduxjs/toolkit"

const authState= {
    token: localStorage.getItem('token') || null,
    login_error:{
        message:'',
        code_msg:'',
    },
    register_error:{
        message:'',
        code_msg:'',
    },
}

const authSlice = createSlice({
    name:"authSlice",
    initialState:authState,
    reducers: {
        loginSuccess: (state,action) => {
            state.login_error={
                message:'',
                code_msg:'',
            };
        },
        loginFail: (state,action) => {
            state.login_error=action.payload.data;
        },
        registerSuccess: (state,action) => {
            state.register_error={
                message:'',
                code_msg:'',
            };
        },
        registerFail: (state,action) => {
            state.register_error=action.payload.data;
        }
    }
})

export const { loginSuccess, loginFail, registerSuccess, registerFail } = authSlice.actions;

export const authReducer = authSlice.reducer;