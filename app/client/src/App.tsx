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