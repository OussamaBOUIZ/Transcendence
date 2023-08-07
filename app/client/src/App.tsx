import React from 'react'
import Chat from './Components/Chat/Chat'
import Header from './Components/Header'
import Home from './Pages/Home/Home'
import Sidebar from './Components/Sidebar'
// import Sign from './Pages/Sign/Sign'
import './scss/main.scss'

import { BrowserRouter, Route,Routes, Link } from 'react-router-dom'
import Sign from './Pages/Sign/Sign'
import Profile from './Pages/Profile/Profile'
// import Friends from './Pages/Friends/Friends'
import Game from './Pages/Game/Game'
import Settings from './Pages/Settings/Settings'

// export default function App () {

//   return (
//     <div>
//       <Header />
//       <main>
//         <Sidebar />
//         <Home />
//       </main>
//     </div>
//   )
// }
import './scss/utils.scss'

function Friends () {
  return (
    <h1>Friends Page</h1>
  )
}

export default function App () {
  return (
    <BrowserRouter>
    <div>
      <Header />
      <main>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/chat" element={<Chat />}/>
        <Route path="/sign" element={<Sign />} />
        <Route path="/game" element={<Game />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      </main>
      </div>
    </BrowserRouter>
  );
}