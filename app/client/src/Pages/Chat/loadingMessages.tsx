import {getUserData} from "../../Hooks/getUserData" 
import axios from 'axios'

export const loadingMessages = (id, user, isBanned, setMessageList) => {
    return () => {
        const fetchMessages = async () => {
            const messages = await axios.get(`/api/channel/loadMessages/${id}?userId=${user?.id}`);
            if (messages.data.length > 0) {
                const newData = await Promise.all(
                    messages.data.map(async (message) => {
                        const userData = await getUserData(message.fromUser);
                        message.image = userData.image;
                        message.username = userData.username;
                        return message;
                    })
                );
                setMessageList(newData);
            }
        };
        if (user !== undefined && user)
            void fetchMessages();
    }
}