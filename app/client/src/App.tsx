import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Route,Routes, useLocation } from 'react-router-dom'
import ChatLayout from './Pages/Chat/ChatLayout'
import Home from './Pages/Home/Home'
import Sign from './Pages/Sign/Sign'
import Game from './Pages/Game/Game'
import Settings from './Pages/Settings/Settings'
import MainLayout from './Layout/MainLayout'
import AuthRequired from './Layout/AuthRequired'
import UserContext, {UserProvider} from './Context/UserContext'

import './scss/main.scss'
import './scss/utils.scss'
import './scss/app.css'
import Prompt from './Pages/Prompt/Prompt'
import Profile from './Pages/Profile/Profile'
import Friends from './Pages/Friends/Friends'
import ChatDm from './Pages/Chat/ChatDm'
import ChatRooms from './Pages/Chat/ChatRooms'
import {useOnlineStatus} from "./Hooks/useOnlineStatus"
import axios from 'axios'
import io from "socket.io-client"
import Auth from './Pages/Auth/Auth'

const UpdateStatus = async () => {
  try {
    console.log("offline mode .....")
    axios.put('/api/user/updateStatus', {status: "offline"})
  }
  catch (error) {
    // console.log(error)
  }
}

export default function App () {
  const {authenticated} = useContext(UserContext);
  const userStatus = useOnlineStatus();

  // create socket
  // useEffect(() => {
  //   const fd = io("ws://localhost:1212", {
  //       withCredentials: true,
  //   })

  //   return  () => {
  //     fd.disconnect();
  //   }
  // }, [])

  if (!userStatus)
    void UpdateStatus();
  return (
    <UserProvider>
        <BrowserRouter>
            <Routes>
              <Route element={<AuthRequired/>}>
                <Route path="/sign" element={<Sign />} />
                <Route path="/info" element={<Prompt />} />
                <Route path="/auth" element={<Auth />} />
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />}/>
                  <Route path="chat" element={<ChatLayout />}>
                    <Route index element={<ChatDm />} />
                    <Route path=":id" element={<ChatDm />} />
                    <Route path="rooms" element={<ChatRooms />} />
                    <Route path="rooms/:id" element={<ChatRooms />} />
                  </Route>
                  <Route path="/game" element={<Game />} />
                  <Route path="/friends" element={<Friends />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} >
                    <Route path='/profile:username' element={<Profile />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
      </UserProvider>
  );
}