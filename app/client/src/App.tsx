import React from 'react'
import Chat from './Components/Chat'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import './scss/main.scss'

export default function App () {

  return (
    <div>
      <Header />
      <Sidebar />
      {/* <Chat /> */}
    </div>
  )
}

