import {Message} from "../../../../global/Interfaces"

export const listener = (socket, setMessageList, setBanned) => {
    console.log('listener...')
    return () => {
        socket?.on("sendChannelMessage", (data: Message)  => setMessageList((list) => [...list, data]));

        socket?.on('userIsBanned', () => setBanned(true))

        socket?.on('socketDisconnect', (channelName: string) => socket?.emit('leavechannel', {channelName: channelName, userId: user.id}))
    }
}