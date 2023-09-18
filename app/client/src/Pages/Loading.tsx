import React from 'react'
import logo from "../Assets/Icons/logo.svg";
import "../scss/loading.scss"

export default function Loading() {
  return (
    <div className='w-screen h-screen bg-purple-500 flex justify-center items-center'>
      
      <div className="flex flex-col items-center">
      <div className="spinner">
        <svg className="raquet " id="r-1">
          <ellipse className="front" cx="44" cy="50" rx="35" ry="50" />
          <ellipse className="middle" cx="42" cy="50" rx="35" ry="50" />
          <ellipse className="back" cx="40" cy="50" rx="35" ry="50" />
          <rect className="handle outer" x="40" y="100" width="10" height="42" />
          <rect className="handle inner" x="38" y="100" width="10" height="41" />
          <rect className="handle outer" x="35" y="100" width="10" height="40" />
          <ellipse className="shadow" id="sor-1" cx="40" cy="50" rx="7" ry="10" />
        </svg>
        <svg className="raquet " id="r-2">
          <ellipse className="back" cx="40" cy="50" rx="35" ry="50" />
          <ellipse className="middle" cx="42" cy="50" rx="35" ry="50" />
          <ellipse className="front" cx="44" cy="50" rx="35" ry="50" />
          <rect className="handle outer" x="35" y="100" width="10" height="42" />
          <rect className="handle inner" x="37" y="100" width="10" height="41" />
          <rect className="handle outer" x="40" y="100" width="10" height="40" />
          <ellipse className="shadow" id="sor-2" cx="44" cy="50" rx="7" ry="10" />
        </svg>
        <div className="ball-container">
          <svg className="ball">
            <circle className=' fill-red-500' cx="20" cy="20" r="12" />
          </svg>
        </div>
        <svg className="shadows">
          <ellipse id="sr-1" cx="70" cy="30" rx="50" ry="15"/>
          <ellipse id="sb" cx="150" cy="30" rx="15" ry="4.5"/>
          <ellipse id="sr-2" cx="230" cy="30" rx="50" ry="15"/>
        </svg>
      </div>
      <img src={logo} alt="" className=' w-40'/>
      </div>
    </div>
  )
}
