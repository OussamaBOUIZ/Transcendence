import React from 'react'
import Chat from './Components/Chat/Chat'
import Header from './Components/Header'
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

