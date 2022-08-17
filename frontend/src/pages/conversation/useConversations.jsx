import { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";

const useConversations = () => {
    const socketRef = useRef();
    const [conversations, setConversations] = useState(undefined);
    const userId = sessionStorage.getItem('userId');
    const conversationId = sessionStorage.getItem('conversationId');
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
        socketRef.current.on('updateConversation', (conversation) => {
            if(conversationId) {
                // remove updating conversation from the array
                let updatedConversationsList = conversations.filter(c => c.id !==conversationId);
                // add the updated conversation at the first place of the new array
                setConversations([conversation, ...updatedConversationsList])
            }
        })

        return () => {
            socketRef.current.disconnect()
        }

    }, [userId,conversationId,conversations])

    return {conversations};
}

export default useConversations