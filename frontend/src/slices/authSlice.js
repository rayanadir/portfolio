import { createSlice } from "@reduxjs/toolkit"

const authState= {
    token: localStorage.getItem('token') || sessionStorage.getItem('token') || null,
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
        status: 'initial'
    },
    request:"none"
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
            state.token=action.payload.data.token;
            //localStorage.setItem('token',action.payload.data.token)
        },
        loginFail: (state,action) => {
            state.login_error=action.payload.data;
        },
        registerSuccess: (state,action) => {
            state.register_error={
                message:'',
                code_msg:'',
            };
            state.token=action.payload.data.token;
            //localStorage.setItem('token',action.payload.data.token)
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
        },
        setInitialPasswordState: (state) => {
            state.change_password.status='initial';
            state.change_password.code_msg='';
            state.change_password.message="";
        },
        logoutAction: (state)=> {
            state.token=null;
            localStorage.removeItem('token');
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('token');
        },
        startRequest: (state) => {
            state.request="loading"
        },
        endRequest: (state) => {
            state.request="none"
        }
    }
})

export const 
    { 
     loginSuccess,
     loginFail, 
     registerSuccess, 
     registerFail, 
     resetPasswordRes, 
     forgotPasswordRes,
     changePasswordRes, 
     logoutAction, 
     setInitialPasswordState,
     startRequest,
     endRequest 
    } = authSlice.actions;

export const authReducer = authSlice.reducer;