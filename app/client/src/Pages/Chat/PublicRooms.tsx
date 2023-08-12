import React, { useState } from "react";
import cube from "../../Assets/Icons/cube.svg";
import { data } from "./rooms.json";
import { NavLink } from "react-router-dom";

export default function Rooms() {

  const rooms = data.map((room) => {
    const [isActive, setIsActive] = useState(false);

    return (
      <div
        key={room.id}
        className={`${isActive ? 'active' : ''} room h-14 p-2 flex justify-between items-center px-7 cursor-pointer`}>
        <NavLink to={""} style={({isActive}) => setIsActive(isActive)}>
            <div className="room-header flex gap-5">
            <img src={cube} alt="" />
            {room.name}
            </div>
        </NavLink>
      </div>
    )
  })

  return (
    <>
      {rooms}
    </>
  )
}