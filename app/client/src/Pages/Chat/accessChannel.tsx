import { binarySearch } from "../../Hooks/binarySearch"
import {getUserData} from "../../Hooks/getUserData" 
import axios, {AxiosResponse} from 'axios'
import {Socket} from "socket.io-client"
import {Message, roomData} from "../../../global/Interfaces"

export const accessChannel = (id: number, socket: Socket | undefined, roomData: roomData, setBanned: React.Dispatch<React.SetStateAction<boolean>>, userId: number, setMessageList: React.Dispatch<React.SetStateAction<Message[]>>, blockedUsers: Record<string, number>[]) => {
    return () => {
        setBanned(false)
        setMessageList([])
        socket?.emit("accessChannel", roomData);
        const fetchMessages = async () => {
            const messages: AxiosResponse<Message[]> = await axios.get(`/api/channel/loadMessages/${id}?userId=${userId}`);
            const newData = await Promise.all(
                messages.data.map(async (message) => {
                    if (binarySearch(blockedUsers, message.fromUser))
                        return message
                    const userData = await getUserData(message.fromUser, "id");
                    if (typeof userData === 'object') {
                        message.image = userData.image;
                        message.username = userData.username;
                        message.isBlocked = false
                    }
                        return message
                })
            );
            setMessageList(newData);
        };
        if (id && userId)
            void fetchMessages();

        return  () => {
            if (socket)
                socket.emit("leavechannel", roomData);
        }
    }
}