import React, {useContext, useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import {useOnlineStatus} from "../Hooks/useOnlineStatus"
import axios from 'axios'
import io from "socket.io-client"
import {gameInvInfo} from "../../global/Interfaces"
import UserContext from '../Context/UserContext'
import Notification from '../Components/Notification'
import useEffectOnUpdate from '../Hooks/useEffectOnUpdate'
import { getUserData } from '../Hooks/getUserData'
import Loading from '../Pages/Loading'

export default function MainLayout () {
    const userStatus = useOnlineStatus();
    const {user, socket, setSocket, navigate, notif, invitation, setInvitation} = useContext(UserContext)

    const UpdateStatus = async () => {
      try {
        void axios.put('/api/user/updateStatus', {status: "Offline"})
      }
      catch (err: any) {
        navigate('/error', { state: { statusCode: err.response.status, statusText: err.response.statusText } });
      }
    }

    useEffectOnUpdate(() => {
      if (user.id) {
        if (!user.firstname || !user.lastname || !user.username)
          window.location.href = '/info'
      }
    }, [user])
    
    // create socket
    useEffect(() => {
      const fd = io("ws://localhost:1212", {
          withCredentials: true,
      })
      setSocket(fd)

      return  () => {
        fd.disconnect();
      }
    }, [])

    useEffectOnUpdate(() => {
      socket?.on('challengeAccepted', (data: {key: number, gameName: string}) => {
        navigate(`/game/${data.gameName}/${data.key}`)
      })

      socket?.on('invitation', (gameInfo: gameInvInfo) => {
        const fetchUserData = async () => {
          try {
            
            const user = await getUserData(gameInfo.userId, "id")
            if (typeof user === 'object') {
              setInvitation({
                hostId: gameInfo.userId,
                image: String(user.image),
                username: user.username,
                gameName: gameInfo.gameName.replace(/\s/g, '')
              })
            }
          }
          catch (err: any) {
            navigate('/error', { state: { statusCode: err.response.status, statusText: err.response.statusText } });
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

    if (!user.id)
      return <Loading />

    return (
        <div className='w-screen h-full'>
          {(notif || invitation?.username) && <Notification message={notif} playNow={invitation} />}
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