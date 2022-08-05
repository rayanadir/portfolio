import axios from "axios";
import { loginSuccess, loginFail, registerSuccess, registerFail, changePasswordRes, forgotPasswordRes, resetPasswordRes } from "../slices/authSlice";
import { store } from "../app/store"

const BASE_URL = "http://localhost:5000";
const token = localStorage.getItem("token");

const login =  (email,password) => {
    axios.post(BASE_URL+"/api/login", {email,password})
    .then(res => {
        console.log(res);
        store.dispatch(loginSuccess(res))
        
        return res;
    })
    .catch(err=> {
        console.log(err.response);
        store.dispatch(loginFail(err.response))
        return err;
    })
}

const register =  (email,username,password,confirmPassword) => {
     axios.post(BASE_URL+"/api/register", {email,username,password,confirmPassword})
    .then(res => {
        console.log(res);
        store.dispatch(registerSuccess(res))
        return res;
    })
    .catch(err => {
        console.log(err.response);
        store.dispatch(registerFail(err.response));
        return err;
    })
}

const logout = () => {
    axios.post(BASE_URL+"/api/logout")
    .then(res=> {return res})
    .catch(err => { return err})
}

const resetPassword = (token,newPassword,confirmNewPassword) => {
    axios.put(BASE_URL+"/api/resetPassword/"+token,{newPassword,confirmNewPassword})
    .then((res) => {
        console.log(res.data)
        store.dispatch(resetPasswordRes(res.data))
        return res;
    })
    .catch((err) => {
        console.log(err.response.data)
        store.dispatch(resetPasswordRes(err.response.data))
        return err;
    });
}


const forgotPassword = (email) => {
    axios.put(BASE_URL+"/api/forgotPassword", {email})
    .then((res)=> {
        console.log(res.data);
        store.dispatch(forgotPasswordRes(res.data))
        return res;
    })
    .catch((err) => {
        console.log(err);
        store.dispatch(forgotPasswordRes(err.response.data))
        return err;
    })
}

const changePassword = (data) => {
    axios.put(BASE_URL+"/api/changePassword",data, {
        headers: {Authorization: `Bearer ${token}`}
    })
    .then((res) => {
        console.log(res);
        store.dispatch(changePasswordRes(res))
        return res;
    })
    .catch((err) => {
        console.log(err)
        store.dispatch(changePasswordRes(err))
        return err;
    })
}

const auth_service = { login, register, logout, resetPassword, forgotPassword, changePassword}

export default auth_service;