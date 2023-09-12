import React, {createContext, useState, useEffect, useContext, SetStateAction} from 'react'
import ChatOverview from './ChatOverview';
import { useParams } from 'react-router-dom'
import RoomHeader from "./RoomHeader"
import axios from 'axios'
import "../../scss/chat.scss"
import InboxRooms from './InboxRooms';
import {roomData, Message} from "../../../global/Interfaces"
import MessageBox from "../../Components/MessageBox"
import io, {Socket} from "socket.io-client"
import UserContext from "../../Context/UserContext"
import AddUser from "./addUser"
import ChatWindow from "./ChatWindow"
import ChatInput from "./chatInput"
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';
import {scrollLogic} from "./scrollLogic"
import {listener} from "./listener"
import {accessChannel} from "./accessChannel"
import CreateRoom from './createRoom';
import {binarySearch} from "../../Hooks/binarySearch"
import InboxContext from '../../Context/InboxContext';

type typeProps = {
    socket: Socket | undefined;
    id: string | undefined;
    myGrade: string;
    isClick: boolean;
    update: number;
    setUpdate: React.Dispatch<SetStateAction<number>>;
    setIsClick: React.Dispatch<SetStateAction<boolean>>;
    setAction: React.Dispatch<SetStateAction<"create" | "update">>;
    roomData: roomData;
    showSearch: boolean;
    setShowSearch: React.Dispatch<SetStateAction<boolean>>;
    setDefaultRoomType: React.Dispatch<React.SetStateAction<string>>;
}

export const SocketContext = createContext<typeProps>({} as typeProps);


export default function ChatRooms () {

    const [message, setMessage] = useState<string>("")
    const [messageList, setMessageList] = useState<Message[]>([])
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const {socket, setSocket, user, isAnimationFinished, setIsAnimationFinished, show, setStatusCode, setStatusText, setNotif} = useContext(UserContext)
    const [roomData, setRoomData] = useState<roomData>({} as roomData)
    const [myGrade, setMyGrade] = useState<string>("")
    const [isClick, setIsClick] = useState<boolean>(false)
    const [action, setAction] = useState<"create" | "update">("create")
    const [update, setUpdate] = useState<number>(0);
    const [blockedUsers, setBlockedUsers] = useState<{id: number}[]>([])
    const {id} = useParams()
    const {outerDiv, innerDiv, prevInnerDivHeight, setBanned, viewIdRef} = useContext(InboxContext)
    const [defaultRoomType, setDefaultRoomType] = useState<string>("public")

    //set myGrade and room data
    useEffectOnUpdate(() => {
        const getInfo = async () => {
            try {
                const res = await axios.get<string>(`/api/channel/channelName/${String(id)}`);
                setRoomData({
                    channelId: Number(id),
                    channelName: res.data,
                    userId: user?.id,
                })
                try {
                    const res = await axios.get<string>(`/api/channel/userGrade/${user?.id}?channelId=${String(id)}`);
                    setMyGrade(res.data)
                    try {
                        const res = await axios.get<{id: number}[]>(`/api/user/blockedUsers/${user?.id}`);
                        setBlockedUsers(res.data)
                    }
                    catch (err) {
                        setStatusCode(err.response.status)
                        setStatusText(err.response.statusText)
                        // window.location.replace('/error')
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
        viewIdRef.current = NaN;
        if (user && id)
            void getInfo()
    }, [id, user])

    // create socket
    useEffect(() => {
        console.log("socket room is called");
        
        const fd = io("ws://localhost:1212", {
            withCredentials: true,
        })
        setSocket(fd)

        return  () => {
                fd.disconnect();
            }
    }, [])

    const sendMessage: React.FormEventHandler<HTMLElement> = (event) => {
        event.preventDefault();

        if (message !== "") {
            const messageData: Message = {
                message: message,
                channelName: roomData.channelName,
                fromUser: user?.id,
                username: user?.username,
                isBlocked: false,
            }
            console.log(messageData);
            
            socket?.emit("channelMessage", messageData);
            setMessage("");
            const outerDivHeight = outerDiv?.current?.clientHeight ?? 0;
            const innerDivHeight = innerDiv?.current?.clientHeight !== undefined
            ? innerDiv.current.clientHeight + 24 : 24;
        
            outerDiv?.current?.scrollTo({
                top: innerDivHeight - outerDivHeight,
                left: 0,
                behavior: "smooth"
            });
        }
    }

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
    useEffectOnUpdate(accessChannel(Number(id), socket, roomData, setBanned, user.id, setMessageList, blockedUsers), [roomData, blockedUsers])

    // listener
    useEffectOnUpdate(listener(socket, user.id, setMessageList, setBanned), [socket]);

    useEffectOnUpdate(() => {setNotif(""); setIsAnimationFinished(false)}, [isAnimationFinished])

    if (!socket && !roomData)
        return null;

    return (
        <SocketContext.Provider value={{socket, setDefaultRoomType, id, myGrade, isClick, update, setUpdate, setIsClick, setAction, roomData, showSearch, setShowSearch}}>
            {
                showSearch &&
                <div className="bg-violet-700 bg-opacity-90 z-50 addUser absolute flex items-center justify-center top-0 left-0 w-full h-full">
                    <AddUser/>
                </div>
            }
            {
                isClick &&
                <div className="popUp absolute flex items-center justify-center">
                    <CreateRoom action={action} defaultValue={defaultRoomType}/>
                </div>
            }
            {/* {notif && <Notification message={notif} />} */}
            <InboxRooms />
            <div className={`chat_main grid ${show === 'main' ? 'on' : 'off'}`}>
                <RoomHeader />
                <ChatWindow id={id} >
                    {messagesElements.length ? messagesElements : <p>No messages yet</p>}
                </ChatWindow>
                <ChatInput message={message} setMessage={setMessage} sender={sendMessage} id={id}/>
            </div>
            <ChatOverview id={id}/>
        </SocketContext.Provider>
    );
}