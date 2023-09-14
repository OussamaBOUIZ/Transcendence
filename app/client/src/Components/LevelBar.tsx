import React, { useState } from 'react'
import '../scss/chat.scss'

export default function LevelBar({val}: {val:string}) {
  
  return (
    <div className="level_bar relative" >
      <div className=" bg-pink-500 h-full rounded-lg" style={{width: val + '0%'}}></div>
    </div>
  )
}
