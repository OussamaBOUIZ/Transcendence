import { useContext } from "react"
import {getUserData} from "../../Hooks/getUserData" 
import axios from 'axios'
import { SocketContext } from "./ChatRooms"

export const loadingMessages = (id, isBanned, setMessageList) => {
    return () => {
        const fetchMessages = async () => {
            const messages = await axios.get(`/api/channel/loadMessages/${id}`);
            const newData = await Promise.all(
                messages.data.map(async (message) => {
                    const userData = await getUserData(message.fromUser);
                    message.image = userData.image;
                    message.username = userData.username;
                    return message;
                })
            );
            setMessageList(newData);
        };
        void fetchMessages();
    }
}