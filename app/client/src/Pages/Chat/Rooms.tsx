import React, { useState } from "react";
import cube from "../../Assets/Icons/cube.svg";
import { NavLink } from "react-router-dom";
import {useFetchJoinedRooms} from "../../Hooks/useFetchJoinedRooms"
import ChatRoom from "./ChatRoom"

interface propsType {
  type: 'public' | 'protected' | 'private';
  setRoom: any;
}

function RoomItem({room, setRoom}: {room: any, setRoom: any}) {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div
      className={`${isActive ? 'active' : ''} room h-14 p-2 flex justify-between items-center px-7 cursor-pointer`}
      onClick={() => {setRoom(room)}}>
      {/* <NavLink to={room.id} style={({isActive}) => setIsActive(isActive)}> */}
          <div className="room-header flex gap-5">
          <img src={cube} alt="" />
          {room.channel_name}
          </div>
      {/* </NavLink> */}
    </div>
  )
}

export default function Rooms({type, setRoom} : propsType) {

  const {publicRooms, protectedRooms, privateRooms} = useFetchJoinedRooms();

    // Choose the appropriate rooms array based on the provided type
    let roomsToRender = null;
    if (type === 'public')
      roomsToRender = publicRooms
    else if (type === "protected") {
      roomsToRender = protectedRooms;
    } else {
      roomsToRender = privateRooms;
    }

  return (
    <>
      {Object.values(roomsToRender).map((room) => (
        <RoomItem key={room.id} room={room} setRoom={setRoom} />
      ))}
    </>
  )
}