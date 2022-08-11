import { TextareaAutosize } from "@mui/material";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const newConversation = (userId) => {
    axios.post(BASE_URL+"/api/newConversation", {userId})
    .then((res) => {
        console.log(res);
        return res;
    })
    .catch((err) => {
        console.log(err);
        return err;
    })
}

const sendMessage = (message, userId, id) => {
    axios.post(BASE_URL+"/api/sendMessage", {message,userId, id})
    .then((res) => {
        console.log(res);
        return res;
    })
    .catch((err) => {
        console.log(err);
        return err;
    })
}

const conversation_service = { newConversation, sendMessage }

export default conversation_service;