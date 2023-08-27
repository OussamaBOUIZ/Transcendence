import {Message} from "../../../../global/Interfaces"
import { getUserImage } from "../../Hooks/getUserImage";

export const listener = (socket, setMessageList, setBanned) => {
    console.log('listener...')
    return () => {
        socket?.on("sendChannelMessage", async (data: Message)  => {
            console.log('getChannelMessage')
            data.image = await getUserImage(data.fromUser)
            setMessageList((list) => [...list, data])
        });

        socket?.on('userIsBanned', () => setBanned(true))

        socket?.on('socketDisconnect', (channelName: string) => socket?.emit('leavechannel', {channelName: channelName, userId: user.id}))
    }
}