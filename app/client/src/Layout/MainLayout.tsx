import React, {useContext, useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import {useOnlineStatus} from "../Hooks/useOnlineStatus"
import axios from 'axios'
import io from "socket.io-client"
import UserContext from '../Context/UserContext'
import Notification from '../Components/Notification'
import useEffectOnUpdate from '../Hooks/useEffectOnUpdate'
import { getUserData } from '../Hooks/getUserData'

const UpdateStatus = async () => {
  try {
    void axios.put('/api/user/updateStatus', {status: "offline"})
  }
  catch (error) {
    // console.log(error)
  }
}

export default function MainLayout () {
    const userStatus = useOnlineStatus();
    const {user, socket, setSocket, notif, invitation, setInvitation} = useContext(UserContext)
    console.log(notif);
    
    // create socket
    useEffect(() => {
      if (!user.firstname.length || !user.lastname.length || !user.username.length)
        window.location.replace('/info')
      const fd = io("ws://localhost:1212", {
          withCredentials: true,
      })
      // setInvitation({image: '', username: 'oouazize'})
      setSocket(fd)

      return  () => {
        fd.disconnect();
      }
    }, [])

    useEffectOnUpdate(() => {
      socket?.on('invitation', (hostId: number) => {
        const fetchUserData = async () => {
          try {
            const user = await getUserData(hostId, "id")
            setInvitation({image: String(user.image), username: user.username})
          }
          catch (err) {
            // console.log(err)
          }
      }
        void fetchUserData()
      })
    }, [socket])
  
    const {pathname} = useLocation()
    const re = new RegExp('/game(/.*)?')
    const chat = new RegExp('/chat(/.*)?')
  
    if (!userStatus)
      void UpdateStatus();
    return (
        <div className='w-screen h-full'>
          {(notif || invitation?.username )&& <Notification message={notif} playNow={invitation} />}
            <div className="fixed z-50 w-screen top-0 bg-primary-color sm:bg-transparent">
                {!re.test(pathname) && <Header />}
            </div>
            <main className={`${chat.test(pathname) ? 'w-screen' : 'w-11/12'}`}>
                {!re.test(pathname) && <Sidebar />}
                <Outlet />
            </main>
        </div>
    );
}