import React, { useState } from 'react'

export default function LevelBar() {

  const [barStyle, setBarStyle] = useState({
    width: `${'1'}0%`,
  });
  
  return (
    <div className="level_bar relative" style={barStyle}></div>
    // <div className=" " style={barStyle}></div>
  )
}
