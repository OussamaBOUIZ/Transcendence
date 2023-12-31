import { useContext } from "react";
import {Message} from "../../../global/Interfaces"
import { getUserImage } from "../../Hooks/getUserImage";
import {Socket} from "socket.io-client"
import UserContext from "../../Context/UserContext";

export const listener = (socket: Socket | undefined, setUpdate: React.Dispatch<React.SetStateAction<number>>, userId: number, setMessageList: React.Dispatch<React.SetStateAction<Message[]>>, setBanned: React.Dispatch<React.SetStateAction<boolean>>) => {
    const {navigate} = useContext(UserContext)
    return () => {
        socket?.on("sendChannelMessage", async (data: Message)  => {            
            data.image = await getUserImage(data.fromUser)
            setMessageList((list) => [...list, data])
        });

        socket?.on('userIsBanned', (channelName: string) => {
            socket?.emit('leavechannel', {channelName: channelName, userId: userId})
            setBanned(true)
        })

        socket?.on('notifUpdate', (channelId: number) => {
            window.location.href = `/chat/rooms/${channelId}`
        })

        socket?.on('socketDisconnect', (channelName: string) => socket?.emit('leavechannel', {channelName: channelName, userId: userId}))
    }
}