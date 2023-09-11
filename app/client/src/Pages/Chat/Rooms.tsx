import React, { useContext, useState } from "react";
import {NavLink} from "react-router-dom"
import cube from "../../Assets/Icons/cube.svg";
import {rooms} from "../../../global/Interfaces"
import UserContext from "../../Context/UserContext";

function RoomItem({item}: {item: rooms}) {
  const [mode, setIsActive] = useState<boolean>(false);
  const {setShow} = useContext(UserContext)

  return (
    <NavLink to={`/chat/rooms/${String(item.id)}`}
      style={({ isActive }) => {
        setIsActive(isActive);
        return {backgroundColor: 'blue'};
      }}>
      <div
        className={`${mode ? 'bg-room-active-bar' : ''} room h-14 p-2 flex justify-between items-center px-7 cursor-pointer`}
        onClick={() => setShow('main')}>
            <div className="room-header flex gap-5">
              <img src={cube} alt="" />
              {item.channel_name}
            </div>
      </div>
    </NavLink>
  )
}

export default function Rooms({roomsToRender} : {roomsToRender: rooms[]}) {

  return (
    <>
      {Object.values(roomsToRender).map((item) => (
        <RoomItem key={item.id} item={item} />
      ))}
    </>
  )
}