import React, {useState, useEffect, useContext, useRef} from "react"
import io, {Socket} from "socket.io-client"
import UserContext from "../../Context/UserContext"
import {rooms, MessageBox, roomData} from "../../../../global/Interfaces"

export default function ChatRoom({room, prevRoom}: {room: rooms, prevRoom: string}) {
    const [socket, setSocket] = useState<Socket>()
    const [message, setMessage] = useState<string>("")
    const [messageList, setMessageList] = useState<MessageBox[]>([])
    const {user} = useContext(UserContext)
    const initState = useRef<boolean>(false)
    const ini = useRef<boolean>(false)


    const [roomData, setRoomData] = useState<roomData>({} as roomData)

    const sendMessage = () => {
        if (message !== "") {
          const messageData: MessageBox = {
            message: message,
            channelName: room.channel_name,
            fromUser: user.id,
          };
          console.log(messageData);
          socket?.emit("channelMessage", messageData);
          setMessageList((list) => [...list, messageData]);
          setMessage("");
        }
      }


    useEffect(() => {
        const value = document.cookie.split('=')[1]
        const fd = io("ws://localhost:1313", {
            withCredentials: true,
          })
        setSocket(fd)
    }, [])

    useEffect(() => {
        if (!initState.current) {
            initState.current = true;
            return;
        }
        socket?.emit("accessChannel", roomData);
    }, [roomData, socket]);
    
    useEffect(() => {
        setRoomData({
            prevChannel: prevRoom,
            channelName: room.channel_name,
            userId: user?.id,
        });
    }, [user, room, prevRoom]);
    

    useEffect(() => {
        console.log("ko")

        if (ini.current === false)
        {
            ini.current = true
            return ;
        }
        console.log("ok")
        socket?.on("sendChannelMessage", (data: MessageBox)  => {
        console.log(`data is ${data.message}`);
        // console.log(`${data.fromUser}: ${data.message}`)
        // setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <>
            <input
                type="text"
                placeholder="type a message...."
                className="py-1 px-3 text-black rounded-lg"
                onChange={(e) => setMessage(e.target.value)}/>
            <button className="p-2 bg-yellow-500 text-black rounded-md" onClick={sendMessage} >send</button>
        </>
    );
}