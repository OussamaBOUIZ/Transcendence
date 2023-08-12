import React from 'react'
import ChatLayout from './Pages/Chat/ChatLayout'
import Home from './Pages/Home/Home'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Sign from './Pages/Sign/Sign'
import Game from './Pages/Game/Game'
import Settings from './Pages/Settings/Settings'
import MainLayout from './Layout/MainLayout'
import AuthRequired from './Layout/AuthRequired'


import './scss/main.scss'
import './scss/utils.scss'
import Prompt from './Pages/Prompt/Prompt'
import Profile from './Pages/Profile/Profile'
import Friends from './Pages/Friends/Friends'
import ChatDmInit from './Pages/Chat/ChatDmInit'
import ChatRooomsInit from './Pages/Chat/ChatRoomsInit'

export default function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign" element={<Sign />} />
        <Route element={<AuthRequired />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/chat/*" element={<ChatLayout />}>
                <Route index  element={<ChatDmInit /> }/>
                <Route path="rooms"  element={<ChatRooomsInit /> }/>
            </Route>
            {/* 
              Both <ChatDmInit /> and <ChatRooomsInit /> will be 
              routed through /chat/init /chat/rooms/init
              or /chat/dminit /chat/roomsinit
              the routes just above should be rendering <ChatDmMain /> and 
              <ChatRoomsMain /> 
              Based on the userflow the Init components are render either
              when the user has no activity yet or when he wants to initiate 
              a new activity; by activity i mean both conversation on dm and 
              rooms.
              So the first scenario will surely happen at the first time the user
              creates an account in the application. Therefore we will
              be examining this state for the logged user and if it's the case
              will be redirecting them to init components using the <Navigate /> 
              element. For the second scenario we will provide the user with
              a call to action at the top left corner from which we could access
              those init components.
            */}
            <Route path="/game" element={<Game />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/info" element={<Prompt />} />
            <Route path="/profile" element={<Profile />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
