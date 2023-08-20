import React, {createContext, useState, useEffect, useRef, useContext} from 'react'
import ChatOverview from './ChatOverview';
import ChatAccount from './ChatAccount';
import "../../scss/chat.scss"
import InboxRooms from './InboxRooms';
import OnlineNow from './OnlineNow';
// import {Outlet, Routes, Route, Link, useParams} from 'react-router-dom'
import {rooms, roomData, MessageBox} from "../../../../global/Interfaces"
import ChatRoom from "./ChatRoom"
import io, {Socket} from "socket.io-client"
import UserContext from "../../Context/UserContext"
import Notification from "../../Components/Notification"

export const SocketContext = createContext({});

export default function ChatLayout () {

    const [room, setRoom] = useState<rooms>({id: 0, channel_name: "", channel_type: ""})
    const [socket, setSocket] = useState<Socket>()
    const [message, setMessage] = useState<string>("")
    const [messageList, setMessageList] = useState<MessageBox[]>([])
    const {user} = useContext(UserContext)
    const initState = useRef<boolean>(false)
    const ini = useRef<boolean>(false)


    const [roomData, setRoomData] = useState<roomData>({} as roomData)
    const [notif, setNotif] = useState<string>("")


    useEffect(() => {
        // const value = document.cookie.split('=')[1]
        const fd = io("ws://localhost:1313", {
            withCredentials: true,
          })
        setSocket(fd)

        return  () => {
            if (socket)
                socket.disconnect();
        }
    }, [])

    useEffect(() => {
        if (!initState.current) {
            initState.current = true;
            return;
        }
        socket?.emit("accessChannel", roomData);

        return  () => {
            if (socket)
                socket.emit("leavechannel", roomData);
        }
    }, [roomData, socket]);
    
    useEffect(() => {
        setRoomData({
            channelName: room.channel_name,
            userId: user?.id,
        });
    }, [user, room]);
    

    useEffect(() => {
        console.log("ko")

        if (ini.current === false)
        {
            ini.current = true
            return ;
        }
        socket?.on("sendChannelMessage", (data: MessageBox)  => {
        console.log(`${data.fromUser}: ${data.message}`)
        // setMessageList((list) => [...list, data]);
        });

        socket?.on('userIsBanned', (message: string) => setNotif(message))

        socket?.on('socketDisconnect', (channelName: string) => {
            const newData = {channelName: channelName, userId: user?.id}
            socket?.emit('leavechannel', newData)
        })
    }, [socket]);
 

    if (!socket && !room) {
        return null;
    }

    return (
        <SocketContext.Provider value={{socket, setSocket, room, setRoom, roomData}}>
            {notif && <Notification message={notif} />}
            <div className="chat_container">
                <ChatAccount />
                <div className="chat_list">
                    <OnlineNow />
                    <InboxRooms />
                    <ChatRoom message={message} setMessage={setMessage} setMessageList={setMessageList} />
                </div>
                <ChatOverview />
            </div>
        </SocketContext.Provider>)
    // return (
    //     <div className="chat_container">
    //         <ChatAccount />
    //         <div className="chat_list">
    //              <OnlineNow />
    //                 <nav className='flex justify-between'>
    //                     <Link  className="block" to="/chat">Messages<span></span></Link>
    //                     <Link className="block"  to="/chat/rooms">Channels<span></span></Link>
    //                 </nav>
    //         </div>
    //         <ChatOverview />
    //         <Outlet />
    //     </div>
    // );
}
