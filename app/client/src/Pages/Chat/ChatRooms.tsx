import React, {createContext, useState, useEffect, useRef, useContext} from 'react'
import ChatOverview from './ChatOverview';
import { useParams } from 'react-router-dom'
import RoomHeader from "./RoomHeader"
import axios from 'axios'
import "../../scss/chat.scss"
import InboxRooms from './InboxRooms';
import {roomData, Message} from "../../../../global/Interfaces"
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
import CreateRoom from './createRoom';
import {binarySearch} from "../../Hooks/binarySearch"
import Notification from "../../Components/Notification"

export const SocketContext = createContext({});


export default function ChatRooms () {

    const [socket, setSocket] = useState<Socket>()
    const [message, setMessage] = useState<string>("")
    const [messageList, setMessageList] = useState<Message[]>([])
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const {user, isAnimationFinished, setIsAnimationFinished} = useContext(UserContext)
    const outerDiv = useRef<HTMLDivElement>(null);
    const innerDiv = useRef<HTMLDivElement>(null);
    const [roomData, setRoomData] = useState<roomData>({} as roomData)
    const [isBanned, setBanned] = useState<boolean>(false)
    const prevInnerDivHeight = useRef<HTMLDivElement>(null);
    const [myGrade, setMyGrade] = useState<string>("")
    const [isClick, setIsClick] = useState<boolean>(false)
    const [action, setAction] = useState<"create" | "update">("create")
    const [update, setUpdate] = useState<number>(0);
    const [blockedUsers, setBlockedUsers] = useState()
    const [notif, setNotif] = useState<string>("")


    const {id} = useParams()

    //set myGrade and room data
    useEffectOnUpdate(() => {
        const getInfo = async () => {
            try {
                const res = await axios.get(`/api/channel/channelName/${id}`);
                setRoomData({
                    channelName: res.data,
                    userId: user?.id,
                })
                try {
                    const res = await axios.get(`/api/channel/userGrade/${user?.id}?channelId=${id}`);
                    setMyGrade(res.data)
                    try {
                        const res = await axios.get(`/api/user/blockedUsers/${user?.id}`);
                        setBlockedUsers(res.data)
                    }
                    catch (err) {
                        // console.error(err)
                    }
                }
                catch (err) {
                    // console.log(err)
                }
            }
            catch(error) {
                // console.log(error)
            }
        }
        if (user && id)
            void getInfo()
    }, [id, user])

    const sendMessage = (event: Event) => {
        event.preventDefault();

        if (message !== "") {
            const messageData: Message = {
                message: message,
                channelName: roomData.channelName,
                fromUser: user?.id,
                username: user?.username,
                isBlocked: false,
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
        const fd = io("ws://localhost:1212", {
            withCredentials: true,
        })
        setSocket(fd)

        return  () => {
            if (socket) {
                socket.disconnect();
            }
        }
    }, [])

    const messagesElements = messageList.map((mess) => {
        if (binarySearch(blockedUsers, mess.fromUser)) {
            mess.message = 'Message from blocked user'
            mess.image = ""
            mess.username = ""
            mess.isBlocked = true
        }
        return (
            <MessageBox key={mess.id} id={mess.fromUser !== user.id} username={mess.username} avatar={mess.image} isBlocked={mess.isBlocked} >
                {mess.message}
            </MessageBox>
        )
    })

    useEffectOnUpdate(scrollLogic(outerDiv, innerDiv, prevInnerDivHeight), [messageList]);

    // access channel after click
    useEffectOnUpdate(accessChannel(id, socket, roomData, setBanned, user, setMessageList, blockedUsers), [roomData, blockedUsers])

    // listener
    useEffectOnUpdate(listener(socket, setMessageList, setBanned), [socket]);

    useEffectOnUpdate(() => {setNotif(""); setIsAnimationFinished(false)}, [isAnimationFinished])

    if (!socket && !roomData)
        return null;

    return (
        <SocketContext.Provider value={{socket, id, myGrade, isBanned, isClick, update, setUpdate, setIsClick, setAction, outerDiv, innerDiv, roomData, showSearch, setShowSearch}}>
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
            {notif && <Notification message={notif} />}
            <InboxRooms />
            <div className="chat_main">
            <RoomHeader />
                <ChatRoomWindow messagesElements={messagesElements} setNotif={setNotif} />
                <ChatInput message={message} setMessage={setMessage} sender={sendMessage} />
            </div>
            <ChatOverview id={id}/>
        </SocketContext.Provider>
    );
}