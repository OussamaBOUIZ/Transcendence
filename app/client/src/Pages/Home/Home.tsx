import React, {useState, useContext, useRef, useEffect} from "react";
import "../../scss/home.scss";
import HomeComponent from "./homeComponent";
import UserOverview from "../../Components/userOverview";
import { getLeaders } from "../../Hooks/getLeaders"
import io, {Socket} from "socket.io-client"
import UserContext  from "../../Context/UserContext";
import { type } from '../../../../global/Interfaces';

export default function Home() {

  const [socket, setSocket] = useState<Socket>()
  const [message, setMessage] = useState<string>("")
  const [messageList, setMessageList] = useState([])
  const intitial = useRef<boolean>(false)
  const [data, setData] = useState({channelName: "", channelNewUser: "", providedPass: ""})

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: data.channelName,
        author: data.channelNewUser,
        message: message,
      };
      await socket?.emit("messageSend", messageData);
      setMessageList((list) => [...list, messageData]);
      setMessage("");
    }
  }

  useEffect(() => {
    const value = document.cookie.split('=')[1]
    const newSocket = io("ws://localhost:1313", {
      auth: {
        token: value
      }
    })
    setSocket(newSocket);
    console.log("setting the socket")
  }, [])

  useEffect(() => {
    if (intitial.current === false)
    {
      intitial.current = true
      return ;
    }
    socket?.on("messagee", (data) => {
      console.log(data)
      // setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const joinRoom = () => {
    socket?.emit("joinchannel", data)
  }

    const {user} = useContext(UserContext);

    const leaders = getLeaders();

    if (!user && !leaders)
      return null;

    function handleChange (e) {
      setData(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
    }

  return (
    // <div className="Home flex flex-col gap-4">
    //   <div className="flex gap-4">
    //     <input className="text-black py-1 px-2" placeholder="name" type="text" name="channelNewUser" value={data.channelNewUser} onChange={handleChange} />
    //     <input className="text-black py-1 px-2" placeholder="channelName" type="text" name="channelName" value={data.channelName} onChange={handleChange} />
    //   </div>
    //   <div className="flex flex-col gap-6">
    //     <button className="p-4 bg-emerald-400 text-black cursor-pointer" onClick={joinRoom}>JOIN ROOM</button>
    //     <div className="flex flex-row gap-2">
    //       <input className="text-black py-1 px-2" placeholder="type...." type="text" onChange={(e) => setMessage(e.target.value)} />
    //       <button className="p-2 bg-yellow-500 text-black rounded-md" onClick={sendMessage} >send</button>
    //     </div>
    //   </div>
    <div className="Home">
      <HomeComponent UserData={user} Leaders={leaders} />
      <UserOverview UserData={user} />
    </div>
  );
}

// ------- create room----------
//
// At the time of clicking CREATE button; socket.join(ID: 1)

// const createRoom = () => {
//   socket?.emit("joinRoom")
// }

// --------- Add user to My room --------------
//
// emit("socket", 'id of my room') {server: join}

// ----------- send a message in my room ------------
//
// emit(sendMessage with my room ID and my socket ID)

// const sendMessage = (message) => {
//   socket?.emit("sendMessage", message)
// }

// ----------- leave the room -------------
//
// emit to leaveRoom with my socket ID


// ------------ INBOX ----------------