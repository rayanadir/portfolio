import { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";

const useConversation = () => {
    const socketRef = useRef();
    const [messages, setMessages] = useState([]);
    const conversationId = sessionStorage.getItem('conversationId')

    useEffect(() => {
        socketRef.current= socketIOClient("http://localhost:8900", {
            query:{
                conversationId
            }
        });
        
        // get recent messages
        socketRef.current.on('getMessages', (recentMessages) => {
            setMessages(messages => [...recentMessages])
        })

        // new message
        socketRef.current.on("newMessage", ({message,userId,id}) => {
            console.log(message, userId, id)
            setMessages(messages => [...messages, {message,userId,id}])
        })
        
        return () => {
            socketRef.current.disconnect();
        }
    },[conversationId])

    const sendMessage = (message,userId,id) => {
        socketRef.current.emit('newMessage', {message,userId,id});
    }

    return {messages, sendMessage};
}

export default useConversation