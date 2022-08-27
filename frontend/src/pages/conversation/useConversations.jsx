import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const useConversations = () => {
    const socketRef = useRef();
    const [conversations, setConversations] = useState([]);
    const userId = sessionStorage.getItem('userId');
    const conversationId = sessionStorage.getItem('conversationId');
    useEffect(() => {
        socketRef.current = io(process.env.REACT_APP_API_URL, {
            query: {
                userId
            }
        });



        // get recent conversations
        socketRef.current.on('getConversations', (recentConversations) => {
            setConversations(recentConversations)
        })

        // get conversations list updated
        socketRef.current.on('updateConversation', (conversation) => {
            axios.post(process.env.REACT_APP_API_URL+"api/conversations")
            .then((res) => {
                setConversations(res.data.conversations)
            })
            .catch((err) => {
                setConversations([])
            })
        })

        return () => {
            socketRef.current.disconnect()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, conversationId])


    return { conversations };
}

export default useConversations