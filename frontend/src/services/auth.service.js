import axios from "axios";
import { loginSuccess, loginFail, registerSuccess, registerFail } from "../slices/authSlice";
import { store } from "../app/store"

const BASE_URL = "http://localhost:5000";

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

const auth_service = { login, register, logout }

export default auth_service;