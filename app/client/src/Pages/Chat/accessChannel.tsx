import {getUserData} from "../../Hooks/getUserData" 
import axios from 'axios'

export const accessChannel = (id, socket, roomData, setBanned, user, setMessageList) => {
    return () => {
        setBanned(false)
        setMessageList([])
        socket?.emit("accessChannel", roomData);
        const fetchMessages = async () => {
            const messages = await axios.get(`/api/channel/loadMessages/${id}?userId=${user?.id}`);
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
        if (id && user)
            void fetchMessages();

        return  () => {
            if (socket)
                socket.emit("leavechannel", roomData);
        }
    }
}