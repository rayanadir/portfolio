import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const useConversation = () => {
    const socketRef = useRef();
    const [messages, setMessages] = useState([]);
    const conversationId = sessionStorage.getItem('conversationId')

    useEffect(() => {
        socketRef.current= io(process.env.REACT_APP_API_URL, {
            query:{
                conversationId
            }
        });
        
        // get recent messages
        socketRef.current.on('getMessages', (recentMessages) => {
            setMessages(messages => [...recentMessages])
        })

        // new message
        socketRef.current.on("newMessage", ({message,userId,date,id}) => {
            setMessages(messages => [...messages, {message,userId,date,id}])
        })
        
        return () => {
            socketRef.current.disconnect();
        }
    },[conversationId])

    const sendMessage = (message,userId,date,id) => {
        socketRef.current.emit('newMessage', {message,userId,date,id});
    }

    return {messages, sendMessage};
}

export default useConversation