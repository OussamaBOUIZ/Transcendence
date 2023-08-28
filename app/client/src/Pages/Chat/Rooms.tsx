import React, { useState } from "react";
import {NavLink} from "react-router-dom"
import cube from "../../Assets/Icons/cube.svg";
import {rooms} from "../../../../global/Interfaces"

interface propsType {
  roomsToRender: unknown;
}

function RoomItem({item}: {item: rooms}) {
  const [mode, setIsActive] = useState<boolean>(false);

  return (
    <NavLink to={`/chat/rooms/${item.id}`} style={({isActive}) => setIsActive(isActive)}>
      <div
        className={`${mode ? 'bg-room-active-bar' : ''} room h-14 p-2 flex justify-between items-center px-7 cursor-pointer`}>
            <div className="room-header flex gap-5">
              <img src={cube} alt="" />
              {item.channel_name}
            </div>
      </div>
    </NavLink>
  )
}

export default function Rooms({roomsToRender} : propsType) {

  return (
    <>
      {Object.values(roomsToRender).map((item) => (
        <RoomItem key={item.id} item={item} />
      ))}
    </>
  )
}