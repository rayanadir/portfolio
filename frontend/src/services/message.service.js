import axios from "axios";
import {store} from "../app/store";
import { messageResult } from "../slices/messageSlice";

const API_URL = process.env.REACT_APP_API_URL;

const sendSimpleMessage = (email,message,username) => {
    axios.post(API_URL+"api/simpleMessage", {email,message,username})
    .then((res) => {
        store.dispatch(messageResult(res.data))
        return res;
    })
    .catch((err) => {
        store.dispatch(messageResult(err.data))
        return err;
    })
}

const getAllSimpleMessages = () => {
    axios.post(API_URL+"api/messages")
}

const message_service = {
    sendSimpleMessage,
    getAllSimpleMessages
}

export default message_service