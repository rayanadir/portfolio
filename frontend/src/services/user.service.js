import axios from "axios";
import { store } from "../app/store"
import { getUserAction } from "../slices/userSlice";

const API_URL = process.env.REACT_APP_API_URL;

const getUser = (token) => {
    axios.post(API_URL+"api/getUser", {token}, {
        headers: {"Authorization" : `Bearer ${token}`}
    })
    .then((res) => {
        store.dispatch(getUserAction(res.data.user))
        return res.data;
    })
    .catch((err) => {
        return err
    })
}


const user_service = {getUser}

export default user_service