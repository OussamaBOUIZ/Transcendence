import React, {createContext, useState, useContext, SetStateAction} from 'react'
import ChatOverview from './ChatOverview';
import { useParams } from 'react-router-dom'
import RoomHeader from "./RoomHeader"
import axios from 'axios'
import "../../scss/chat.scss"
import InboxRooms from './InboxRooms';
import {roomData, Message} from "../../../global/Interfaces"
import MessageBox from "../../Components/MessageBox"
import {Socket} from "socket.io-client"
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
    const {socket, user, show, navigate} = useContext(UserContext)
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
                    catch (err: any) {
                        navigate('/error', { state: { statusCode: err.response.status, statusText: err.response.statusText } });
                    }
                }
                catch (err: any) {
                    navigate('/error', { state: { statusCode: err.response.status, statusText: err.response.statusText } });
                }
            }
            catch(err: any) {
                navigate('/error', { state: { statusCode: err.response.status, statusText: err.response.statusText } });
            }
        }
        viewIdRef.current = NaN;
        if (user.id && id)
            void getInfo()
    }, [id, user])

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

    const messagesElements = messageList.map((mess, index) => {
        if (binarySearch(blockedUsers, mess.fromUser)) {
            mess.message = 'Message from blocked user'
            mess.image = ""
            mess.username = ""
            mess.isBlocked = true
        }
        return (
            <MessageBox key={index} id={mess.fromUser !== user.id} username={mess.username} avatar={mess.image} isBlocked={mess.isBlocked} >
                {mess.message}
            </MessageBox>
        )
    })

    useEffectOnUpdate(scrollLogic(outerDiv, innerDiv, prevInnerDivHeight), [messageList]);

    // access channel after click
    useEffectOnUpdate(accessChannel(Number(id), socket, roomData, setBanned, user.id, setMessageList, blockedUsers), [roomData, blockedUsers])

    // listener
    useEffectOnUpdate(listener(socket, setUpdate, user.id, setMessageList, setBanned), [socket]);

    if (!socket && !roomData)
        return null;

    return (
        <SocketContext.Provider value={{socket, setDefaultRoomType, id, myGrade, isClick, update, setUpdate, setIsClick, setAction, roomData, showSearch, setShowSearch}}>
            {
                showSearch &&
                <div className="addUser z-50 absolute flex items-center justify-center top-0 left-0 w-full h-full">
                    <AddUser/>
                </div>
            }
            {
                isClick &&
                <div className="popUp absolute flex items-center justify-center">
                    <CreateRoom action={action} defaultValue={defaultRoomType}/>
                </div>
            }
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