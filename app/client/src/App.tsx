// import React from "react"
// import Home from "./components/Home"
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// import Sign from "./Pages/Sign/Sign"

// export default function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Sign />} />
//                 <Route path="/home" element={<Home />} />
//             </Routes>
//         </Router>
//     )
// } 


import React from 'react'
import Chat from './Pages/Chat/Chat'
import Header from './Components/Header'
import Home from './Pages/Home/Home'
import Sidebar from './Components/Sidebar'
import './scss/main.scss'

export default function App () {

  return (
    <div>
      <Header />
      <main>
        <Sidebar />
        <Chat />
      </main>
    </div>
  )
}
