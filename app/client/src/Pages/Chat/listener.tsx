import {Message} from "../../../../global/Interfaces"

export const listener = (socket, setData, setMessageList, setNotif) => {
    console.log('listener...')
    return () => {
        socket?.on("loadOldConversations", (data) => console.log(data))

        socket?.on("sendChannelMessage", (data: Message)  => setMessageList((list) => [...list, data]));

        socket?.on('userIsBanned', (message: string) => setNotif(message))

        socket?.on('socketDisconnect', (channelName: string) => socket?.emit('leavechannel', {channelName: channelName, userId: user.id}))
    }
}