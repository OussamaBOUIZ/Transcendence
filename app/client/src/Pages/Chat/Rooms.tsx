import React, { useContext } from "react";
import {NavLink} from "react-router-dom"
import cube from "../../Assets/Icons/cube.svg";
import {rooms} from "../../../global/Interfaces"
import UserContext from "../../Context/UserContext";
import { SocketContext } from "./ChatRooms";

function RoomItem({item}: {item: rooms}) {
  const {setShow} = useContext(UserContext)
  const {id} = useContext(SocketContext)

  return (
    <NavLink to={`/chat/rooms/${String(item.id)}`}>
      <div
        className={`${Number(id) === item.id ? 'bg-room-active-bar' : ''} room h-14 p-2 flex justify-between items-center px-7 cursor-pointer`}
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