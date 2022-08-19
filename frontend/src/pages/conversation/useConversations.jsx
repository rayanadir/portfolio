import { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

const useConversations = () => {
    const socketRef = useRef();
    const [conversations, setConversations] = useState([]);
    const userId = sessionStorage.getItem('userId');
    const conversationId = sessionStorage.getItem('conversationId');
    useEffect(() => {
        socketRef.current = socketIOClient("http://localhost:8900", {
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
            axios.post("http://localhost:5000/api/conversations")
            .then((res) => {
                console.log(res.data.conversations)
                setConversations(res.data.conversations)
            })
            .catch((err) => {
                setConversations([])
                console.log(err)
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