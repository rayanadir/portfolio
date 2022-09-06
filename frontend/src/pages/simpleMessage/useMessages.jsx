import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const useMessages = () => {
    const socketRef = useRef();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socketRef.current= io(process.env.REACT_APP_API_URL)

        // get all simple messages
        socketRef.current.on('getSimpleMessages', (simpleMessages) => {
            setMessages(simpleMessages)
        })

        return () => {
            socketRef.current.disconnect()
        }
    }, [])

    return { messages };
}

export default useMessages;