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
    reset_password:{
        message:'',
        code_msg:'',
        status:'initial',
    },
    forgot_password:{
        message:'',
        code_msg:'',
        status:'inital'
    },
    change_password:{
        message:'',
        code_msg:'',
    }
}

const authSlice = createSlice({
    name:"authSlice",
    initialState:authState,
    reducers: {
        loginSuccess: (state) => {
            state.login_error={
                message:'',
                code_msg:'',
            };
        },
        loginFail: (state,action) => {
            state.login_error=action.payload.data;
        },
        registerSuccess: (state) => {
            state.register_error={
                message:'',
                code_msg:'',
            };
        },
        registerFail: (state,action) => {
            state.register_error=action.payload.data;
        },
        resetPasswordRes: (state,action) => {
            state.reset_password=action.payload;
        },
        forgotPasswordRes: (state,action) => {
            state.forgot_password=action.payload;
        },
        changePasswordRes: (state,action) => {
            state.change_password=action.payload;
        }
    }
})

export const { loginSuccess, loginFail, registerSuccess, registerFail, resetPasswordRes, forgotPasswordRes,changePasswordRes } = authSlice.actions;

export const authReducer = authSlice.reducer;