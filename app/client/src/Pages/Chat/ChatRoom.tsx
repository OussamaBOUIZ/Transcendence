import React, {useContext} from "react"
import UserContext from "../../Context/UserContext"
import {SocketContext} from "./ChatLayout"

export default function ChatRoom({message, setMessage, setMessageList}) {

    const {user} = useContext(UserContext)
    const {socket, room} = useContext(SocketContext)

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