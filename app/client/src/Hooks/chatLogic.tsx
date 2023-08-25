import {useState, useRef, useContext} from 'react'
import { getUserData } from './getUserData';
import {Message} from "../../../global/Interfaces"
import { SocketContext } from '../Pages/Chat/ChatRooms';
import UserContext from '../Context/UserContext';
import useEffectOnUpdate from './useEffectOnUpdate';

export function ChatLogic(setRoomData, setNotif) {
    // Logic for socket interactions, message handling, etc.

    // const initState = useRef<boolean>(false)
    const {user} = useContext(UserContext)
    const prevInnerDivHeight = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<Message[]>([])
    const {socket, room, roomData, outerDiv, innerDiv, messageList, setMessageList} = useContext(SocketContext)

    // scroll logic
    // useEffectOnUpdate(() => {
    //     const outerDivHeight = outerDiv.current.clientHeight;
    //     const innerDivHeight = innerDiv.current.clientHeight + 24;
    //     const outerDivScrollTop = outerDiv.current.scrollTop;

    //     if (
    //     !prevInnerDivHeight.current || prevInnerDivHeight.current === 24 ||
    //     outerDivScrollTop === prevInnerDivHeight.current - outerDivHeight
    //     ) {
    //         outerDiv.current.scrollTo({
    //             top: innerDivHeight - outerDivHeight,
    //             left: 0,
    //             behavior: prevInnerDivHeight.current ? "smooth" : "auto"
    //         });
    //     }

    //     prevInnerDivHeight.current = innerDivHeight;
    // }, [messageList]);

    // access channel after click
    // useEffectOnUpdate(() => {
    //     socket?.emit("accessChannel", roomData);
    //     return  () => {
    //         if (socket)
    //             socket.emit("leavechannel", roomData);
    // }}, [roomData, socket])

}