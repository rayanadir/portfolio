import axios from "axios";
import {store} from "../app/store";
import { getConversationsAction } from "../slices/userSlice";

const BASE_URL = "http://localhost:5000";

const newConversation = (userId) => {
    console.log(userId)
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

const getConversation = (id, userId) => {
    axios.post(BASE_URL+"/api/conversation", {id, userId})
    .then((res) => {
        console.log(res);
        return res;
    })
    .catch((err) => {
        console.log(err);
        return err;
    }) 
}

const getConversations = (userId) => {
    axios.post(BASE_URL+"/api/conversations", {userId})
    .then((res) => {
        console.log(res.data);
        store.dispatch(getConversationsAction(res.data));
        return res;
    })
    .catch((err) => {
        console.log(err);
        return err;
    }) 
}

const checkHasConversation = (userId) => {
    axios.post(BASE_URL+"/api/hasConversation", {userId})
    .then((res) => {
        console.log(res);
        store.dispatch(getConversationsAction(res.data));
        return res;
    })
    .catch((err) => {
        console.log(err);
        return err;
    }) 
}

const conversation_service = { newConversation, sendMessage, getConversation, getConversations, checkHasConversation }

export default conversation_service;