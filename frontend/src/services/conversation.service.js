import axios from "axios";

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

const getConversations = () => {
    axios.post(BASE_URL+"/api/conversations")
    .then((res) => {
        console.log(res);
        return res;
    })
    .catch((err) => {
        console.log(err);
        return err;
    }) 
}

const conversation_service = { newConversation, sendMessage, getConversation, getConversations }

export default conversation_service;