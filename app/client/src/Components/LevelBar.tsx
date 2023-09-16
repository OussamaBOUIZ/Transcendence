import React from 'react'
import '../scss/levelBar.scss'

export default function LevelBar({val}: {val:string}) {
  
  return (
    <div className="level_bar">
        <div className="level-bar-fill" style={{ width: `${val}%` }}></div>
    </div>
  )
}
