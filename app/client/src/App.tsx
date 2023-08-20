import React, { useContext } from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
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
import ChatDmInit from './Pages/Chat/ChatDmInit'
import ChatRooomsInit from './Pages/Chat/ChatRoomsInit'
import ChatDm from './Pages/Chat/ChatDm'
import ChatRooms from './Pages/Chat/ChatRooms'

export default function App () {
  const {authenticated} = useContext(UserContext);
  return (
    <UserProvider>
      <BrowserRouter>
          <Routes>


              <Route element={<AuthRequired/>}>
                {/* {authenticated
                   */}
                <Route path="/sign" element={<Sign />} />

                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />}/>
{/*                     
                    <Route path="/chat/*" element={<ChatLayout />}>
                      <Route index element={<ChatDm />} />
                      <Route path="rooms" element={<ChatRooms />} />
                        <Route path="init"  element={<ChatDmInit /> }/>
                        <Route path="rooms/init"  element={<ChatRooomsInit /> }/>
                        <Route path=":id" element={<ChatDm />} />
                        <Route path="rooms:id" element={<ChatRooms />} />
                      </Route> */}
                    
                    <Route path="/chat" element={<ChatLayout />}>
                      <Route index element={<ChatDm />} />
                      <Route path=":id" element={<ChatDm />} />
                      <Route path="rooms" element={<ChatRooms />} />
                      <Route path="rooms:id" element={<ChatRooms />} />
                    </Route>

                    <Route path="/game" element={<Game />} />
                    <Route path="/friends" element={<Friends />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/info" element={<Prompt />} />
                    <Route path="/profile" element={<Profile />} />

                    </Route>
                </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
  );
}