import axios from "axios";
import { loginSuccess, loginFail, registerSuccess, registerFail, changePasswordRes, forgotPasswordRes, resetPasswordRes, logoutAction, startRequest, endRequest } from "../slices/authSlice";
import { store } from "../app/store"
import { logoutUserSliceAction } from "../slices/userSlice";

const API_URL = process.env.REACT_APP_API_URL;

const login =  (email,password, rememberMe) => {
    store.dispatch(startRequest())
    axios.post(API_URL+"api/login", {email,password})
    .then(res => {
        store.dispatch(endRequest())
        store.dispatch(loginSuccess(res));
        if(rememberMe){
            localStorage.setItem('token', res.data.token);
        }else{
            sessionStorage.setItem('token', res.data.token);
        }
        return res;
    })
    .catch(err=> {
        store.dispatch(endRequest())
        store.dispatch(loginFail(err.response))
        return err;
    })
}

const register =  (email,username,password,confirmPassword) => {
    store.dispatch(startRequest())
     axios.post(API_URL+"api/register", {email,username,password,confirmPassword})
    .then(res => {
        store.dispatch(endRequest())
        store.dispatch(registerSuccess(res));
        sessionStorage.setItem('token', res.data.token);
        return res;
    })
    .catch(err => {
        store.dispatch(endRequest())
        store.dispatch(registerFail(err.response));
        return err;
    })
}

const loggedIn = () => {
    axios.get(API_URL+"api/loggedIn")
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err
    })
}

const logout = () => {
    axios.post(API_URL+"api/logout")
    .then(res=> {
        store.dispatch(logoutAction())
        store.dispatch(logoutUserSliceAction())
        return res
    })
    .catch(err => { 
        return err
    })
}

const resetPassword = (token,newPassword,confirmNewPassword) => {
    store.dispatch(startRequest())
    axios.put(API_URL+"api/resetPassword/"+token,{token,newPassword,confirmNewPassword}, {
        headers: {"Authorization":  `Bearer ${token}`}
    })
    .then((res) => {
        store.dispatch(endRequest())
        store.dispatch(resetPasswordRes(res.data))
        return res;
    })
    .catch((err) => {
        store.dispatch(endRequest())
        store.dispatch(resetPasswordRes(err.response.data))
        return err;
    });
}


const forgotPassword = (email) => {
    store.dispatch(startRequest())
    axios.put(API_URL+"api/forgotPassword", {email})
    .then((res)=> {
        store.dispatch(endRequest())
        store.dispatch(forgotPasswordRes(res.data))
        return res;
    })
    .catch((err) => {
        store.dispatch(endRequest())
        store.dispatch(forgotPasswordRes(err.response.data))
        return err;
    })
}

const changePassword = (token,currentPassword, newPassword, confirmNewPassword, userId) => {
    store.dispatch(startRequest())
    axios.put(API_URL+"api/changePassword/"+token,{currentPassword,newPassword, confirmNewPassword, userId}, {
        headers: {"Authorization": `Bearer ${token}`}
    })
    .then((res) => {
        store.dispatch(endRequest())
        store.dispatch(changePasswordRes(res.data))
        return res;
    })
    .catch((err) => {
        store.dispatch(endRequest())
        store.dispatch(changePasswordRes(err.response.data))
        return err;
    })
}

const auth_service = { login, register, logout, resetPassword, forgotPassword, changePassword, loggedIn}

export default auth_service;