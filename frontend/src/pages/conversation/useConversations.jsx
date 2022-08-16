import { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";

const useConversations = () => {
    const socketRef = useRef();
    const [conversations, setConversations] = useState(undefined);
    const userId = sessionStorage.getItem('userId');
    useEffect(() => {
        socketRef.current= socketIOClient("http://localhost:8900",{
            query:{
                userId
            }
        });

        // get recent conversations
        socketRef.current.on('getConversations', (recentConversations) => {
            setConversations(recentConversations)
        })

        // conversation updated
        socketRef.current.on('updateConversation', (conversations) => {
            setConversations([conversations])
        })
    }, [userId])

    return {conversations};
}

export default useConversations