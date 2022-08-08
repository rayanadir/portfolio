import axios from "axios";
//import { loginSuccess, loginFail, registerSuccess, registerFail, changePasswordRes, forgotPasswordRes, resetPasswordRes } from "../slices/authSlice";
import { store } from "../app/store"
import { getUserAction } from "../slices/userSlice";

const BASE_URL = "http://localhost:5000";

const getUser = (token) => {
    axios.post(BASE_URL+"/api/getUser", {token}, {
        headers: {"Authorization" : `Bearer ${token}`}
    })
    .then((res) => {
        store.dispatch(getUserAction(res.data.user))
        return res.data;
    })
    .catch((err) => {
        console.log(err);
        return err
    })
}

const updatePassword = () => {
    
}

const user_service = {getUser, updatePassword}

export default user_service