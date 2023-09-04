import {Message} from "../../../../global/Interfaces"
import { getUserImage } from "../../Hooks/getUserImage";
import {Socket} from "socket.io-client"
import {User} from "../../../../global/Interfaces"

export const listener = (socket: Socket | undefined, user: User, setMessageList: React.Dispatch<React.SetStateAction<Message[]>>, setBanned: React.Dispatch<React.SetStateAction<boolean>>) => {
    return () => {
        socket?.on("sendChannelMessage", async (data: Message)  => {
            data.image = await getUserImage(data.fromUser)
            setMessageList((list) => [...list, data])
        });

        socket?.on('userIsBanned', () => setBanned(true))

        socket?.on('socketDisconnect', (channelName: string) => socket?.emit('leavechannel', {channelName: channelName, userId: user.id}))
    }
}