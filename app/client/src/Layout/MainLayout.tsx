import React, {useContext, useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import {useOnlineStatus} from "../Hooks/useOnlineStatus"
import axios from 'axios'
import io from "socket.io-client"
import UserContext from '../Context/UserContext'

const UpdateStatus = async () => {
  try {
    axios.put('/api/user/updateStatus', {status: "offline"})
  }
  catch (error) {
    // console.log(error)
  }
}

export default function MainLayout () {
    const userStatus = useOnlineStatus();
    const {setSocket} = useContext(UserContext)

    // create socket
    useEffect(() => {
        console.log("create socket 1212");
        
      const fd = io("ws://localhost:1212", {
          withCredentials: true,
      })

      setSocket(fd)

      return  () => {
        fd.disconnect();
      }
    }, [])
  
    if (!userStatus)
      void UpdateStatus();
    return (
        <div className='w-screen h-full'>
            <div className="fixed z-50 w-screen top-0 bg-primary-color sm:bg-transparent">
                <Header />
            </div>
            <main>
                <Sidebar />
                <Outlet />
            </main>
        </div>
    );
}