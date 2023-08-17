import React, {useState, useRef, useEffect} from "react";
import "../../scss/home.scss";
import SideBar from "../../Components/Sidebar";
import HomeComponent from "./homeComponent";
import UserOverview from "../../Components/userOverview";
import { getUserData } from "../../Hooks/getUserData";
import { getLeaders } from "../../Hooks/getLeaders"
import io, {Socket} from "socket.io-client"

export default function Home() {

  const [socket, setSocket] = useState<Socket>()
  const [message, setMessage] = useState<string>("")

  const send = (value: string) => {
    console.log("send message")
    socket?.emit("sendMessage", value);
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


    // const userData = getUserData();
    // const leaders = getLeaders();

    // if (!userData && !leaders)
    //   return null;

  return (
    <div className="Home">
      <HomeComponent UserData={userData} Leaders={leaders} />
      <UserOverview UserData={userData} />
    </div>
  );
}