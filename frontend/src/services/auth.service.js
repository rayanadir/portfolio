import axios from "axios";

const BASE_URL = "http://localhost:5000";

const login = async (email,password) => {
    await axios.post(BASE_URL+"/api/login", {email,password})
    .then(res => {
        console.log(res);
        return res
    })
    .catch(err=> {
        console.log(err.response);
        return err;
    })
}

const register =  (email,username,password,confirmPassword) => {
     axios.post(BASE_URL+"/api/register", {email,username,password,confirmPassword})
    .then(res => {
        console.log(res);
        return res;
    })
    .catch(err => {
        console.log(err.response);
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