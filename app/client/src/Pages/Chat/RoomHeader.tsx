import React, { useContext, useState } from 'react'
import { SocketContext } from './ChatRooms';
import cube from "../../Assets/Icons/cube.svg"
import settings from "../../Assets/Icons/gear-solid.svg"
import addUser from "../../Assets/Icons/addUser.svg"


export default function RoomHeader () {
    const {room, setShowSearch} = useContext(SocketContext)

    function handleChange() {
        
    }

    return (
        <header className='chat_header'>
            <div className='flex gap-7 text-xl items-center'>
                <img className="w-10" src={cube} alt="" />
                <figcaption>
                    <h4>{room.channel_name}</h4>
                </figcaption>
            </div>
            <div className="flex ml-auto w-2/12 justify-around">
                <img className="w-8 cursor-pointer" onClick={() => {setShowSearch(prev => !prev)}} src={addUser} alt="addUser" />
                <img className="w-8 cursor-pointer" onClick={handleChange} src={settings} alt="settings" />
            </div>
        </header>
    );
}