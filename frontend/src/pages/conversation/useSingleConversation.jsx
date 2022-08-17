import { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";

const useSingleConversation = () => {
    const socketRef = useRef();
    const [conversation, setConversation] = useState(undefined);

    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        socketRef.current= socketIOClient("http://localhost:8900",{
            query:{
                userId
            }
        });
        // get single conversation
        socketRef.current.on('getSingleConversation', (conversation) => {
            setConversation(conversation)
        });

        return () => {
            socketRef.current.disconnect();
        }
    },[userId]);

    return {conversation};
}

export default useSingleConversation