import axios from "axios";
import {store} from "../app/store";
import { getConversationsAction, getConversationAction, getAdminUsernameAction, sendMessageAction } from "../slices/userSlice";

const API_URL = process.env.REACT_APP_API_URL;

const newConversation = () => {
    axios.post(API_URL+"api/newConversation")
    .then((res) => {
        return res;
    })
    .catch((err) => {
        return err;
    })
}

const sendMessage = (message, userId, id) => {
    axios.post(API_URL+"api/sendMessage", {message,userId, id})
    .then((res) => {
        store.dispatch(sendMessageAction(res.data))
        return res;
    })
    .catch((err) => {
        return err;
    })
}

const getConversation = (id, userId) => {
    axios.post(API_URL+"api/conversation", {id, userId})
    .then((res) => {
        store.dispatch(getConversationAction(res.data))
        return res;
    })
    .catch((err) => {
        return err;
    }) 
}

const getConversations = (userId) => {
    axios.post(API_URL+"api/conversations", {userId})
    .then((res) => {
        store.dispatch(getConversationsAction(res.data));
        return res;
    })
    .catch((err) => {
        return err;
    }) 
}

const checkHasConversation = (userId) => {
    axios.post(API_URL+"api/hasConversation", {userId})
    .then((res) => {
        store.dispatch(getConversationAction(res.data));
        return res;
    })
    .catch((err) => {
        return err;
    }) 
}

const getAdminUsername = () => {
    axios.post(API_URL+"api/adminUsername")
    .then((res) => {
        store.dispatch(getAdminUsernameAction(res.data.admin_username))
    })
    .catch((err) => {
        return err
    })
}

const isValidConversation = (id) => {
    axios.post(API_URL+"api/checkConversation", {id})
}

const conversation_service = { 
    newConversation,
    sendMessage, 
    getConversation, 
    getConversations, 
    checkHasConversation, 
    getAdminUsername,
    isValidConversation 
}

export default conversation_service;