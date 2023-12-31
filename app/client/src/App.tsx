import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import ChatLayout from './Pages/Chat/ChatLayout'
import Home from './Pages/Home/Home'
import Sign from './Pages/Sign/Sign'
import Game from './Pages/Game/Game'
import Settings from './Pages/Settings/Settings'
import PageNotFound from './Pages/Errors/PageNotFound'
import MainLayout from './Layout/MainLayout'
import AuthRequired from './Layout/AuthRequired'
import {UserProvider} from './Context/UserContext'
import './scss/main.scss'
import './scss/app.css'
import Prompt from './Pages/Prompt/Prompt'
import Profile from './Pages/Profile/Profile'
import Friends from './Pages/Friends/Friends'
import ChatDm from './Pages/Chat/ChatDm'
import ChatRooms from './Pages/Chat/ChatRooms'
import Auth from './Pages/Auth/Auth'
import InputAuth from './Pages/InputAuth'
import DisableTFA from './Pages/DisableTFA'
import Logout from './Pages/Logout'
import ErrorPage from './Pages/Errors/errorPages'
import Landing from './Pages/Landing/Landing'
import ProtectedLanding from './Pages/ProtectedLanding'

export default function App () {

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<ProtectedLanding />}>
            <Route path="/home" element={<Landing />} />
          </Route>
          
          <Route path="/sign" element={<Sign />} />
          <Route path="/inputauth/:data" element={<InputAuth />} />
          <Route path="/error" element={<ErrorPage />} />
            <Route path="/info" element={<Prompt />} />
          <Route element={<AuthRequired/>}>
            <Route path="/auth" element={<Auth />} />
            <Route path="/disabletfa" element={<DisableTFA />} />
            <Route path="/game/:gameMode" element={<Game />} />
            <Route path="/game/:gameMode/:key" element={<Game />} />
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />}/>
                <Route path="chat" element={<ChatLayout />}>
                  <Route index element={<ChatDm />} />
                  <Route path=":id" element={<ChatDm />} />
                  <Route path="rooms" element={<ChatRooms />} />
                  <Route path="rooms/:id" element={<ChatRooms />} />
                </Route>
                <Route path="/friends" element={<Friends />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/logout" element={<Logout />} />
                <Route path='/profile' element={<Profile />} >
                  <Route path='/profile:username' element={<Profile />} />
                </Route>
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}