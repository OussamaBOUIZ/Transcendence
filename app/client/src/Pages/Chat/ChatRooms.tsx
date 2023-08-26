import React, {createContext, useState, useEffect, useRef, useContext} from 'react'
import ChatOverview from './ChatOverview';
import { useParams } from 'react-router-dom'
import RoomHeader from "./RoomHeader"
import axios from 'axios'
import "../../scss/chat.scss"
import InboxRooms from './InboxRooms';
import {rooms, roomData, Message} from "../../../../global/Interfaces"
import MessageBox from "../../Components/MessageBox"
import io, {Socket} from "socket.io-client"
import UserContext from "../../Context/UserContext"
import AddUser from "./addUser"
import ChatRoomWindow from "./ChatRoomWindow"
import ChatInput from "./chatInput"
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';
import {scrollLogic} from "./scrollLogic"
import {listener} from "./listener"
import {accessChannel} from "./accessChannel"
import {loadingMessages} from "./loadingMessages"
import CreateRoom from './createRoom';


export const SocketContext = createContext({});


export default function ChatRooms () {


    const [room, setRoom] = useState<rooms>({} as rooms)
    const [socket, setSocket] = useState<Socket>()
    const [init, setInit] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const [messageList, setMessageList] = useState<Message[]>([])
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const {user} = useContext(UserContext)
    const outerDiv = useRef<HTMLDivElement>(null);
    const innerDiv = useRef<HTMLDivElement>(null);
    const [roomData, setRoomData] = useState<roomData>({} as roomData)
    const [isBanned, setBanned] = useState<boolean>(false)
    const prevInnerDivHeight = useRef<HTMLDivElement>(null);
    const [myGrade, setMyGrade] = useState<string>("")
    const [isClick, setIsClick] = useState<boolean>(false)
    const [action, setAction] = useState<"create" | "update">("create")


    const {id} = useParams()

    useEffectOnUpdate(() => {
        console.log('id change play')
        const getChannelName = async () => {
            try {
                const res = await axios.get(`/api/channel/channelName/${id}`);
                setRoom({
                    id: id,
                    channel_name: res.data
                })
                setRoomData({
                    channelName: res.data,
                    userId: user?.id,
                })
                try {
                    const res = await axios.get(`/api/channel/userGrade/${user?.id}?channelId=${id}`);
                    setMyGrade(res.data)
                }
                catch (err) {
                    // console.log(err)
                }
            }
            catch(error) {
                // console.log(error)
            }
        }
        void getChannelName()
    }, [id, user])

    const sendMessage = (event: Event) => {
        event.preventDefault();

        if (message !== "") {
            const messageData: Message = {
                message: message,
                channelName: room.channel_name,
                fromUser: user.id,
                username: user.username,
                image: user.image
            }
            socket?.emit("channelMessage", messageData);
            setMessage("");
            const outerDivHeight = outerDiv.current.clientHeight;
            const innerDivHeight = innerDiv.current.clientHeight + 24;
        
            outerDiv.current.scrollTo({
                top: innerDivHeight - outerDivHeight,
                left: 0,
                behavior: "smooth"
            });
        }
    }

    // create socket
    useEffect(() => {
        console.log("create socket")
        const fd = io("ws://localhost:1313", {
            withCredentials: true,
        })
        setSocket(fd)
        setInit(prev => !prev)

        return  () => {
            if (socket)
                socket.disconnect();
        }
    }, [])

    const messagesElements = messageList.map((mess) => {
        return (
            <MessageBox key={mess.id} id={mess.fromUser !== user.id} username={mess.username} avatar={mess.image} >
                {mess.message}
            </MessageBox>
        )
    })

    useEffectOnUpdate(loadingMessages(id, isBanned, setMessageList), [isBanned])

    useEffectOnUpdate(scrollLogic(outerDiv, innerDiv, prevInnerDivHeight), [messageList]);

    // access channel after click
    useEffectOnUpdate(accessChannel(id, socket, roomData, setMessageList, setBanned), [roomData])

    // listener
    useEffectOnUpdate(listener(socket, setMessageList, setBanned), [socket]);

    if (!socket && !room)
        return null;

    return (
        <SocketContext.Provider value={{socket, id, myGrade, isBanned, isClick, setIsClick, setAction, outerDiv, innerDiv, room, roomData, showSearch, setShowSearch}}>
            {
                showSearch &&
                <div className="bg-violet-700 bg-opacity-90 z-50 addUser absolute flex items-center justify-center top-0 left-0 w-full h-full">
                    <AddUser/>
                </div>
            }
            {
                isClick &&
                <div className="popUp absolute flex items-center justify-center">
                    <CreateRoom action={action} />
                </div>
            }
            <InboxRooms />
            <div className="chat_main">
                <RoomHeader />
                <ChatRoomWindow messagesElements={messagesElements}/>
                <ChatInput message={message} setMessage={setMessage} sender={sendMessage} />
            </div>
            <ChatOverview />
        </SocketContext.Provider>
    );
}