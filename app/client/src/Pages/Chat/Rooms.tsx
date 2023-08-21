import React, { useContext, useState } from "react";
import cube from "../../Assets/Icons/cube.svg";
import {useFetchJoinedRooms} from "../../Hooks/useFetchJoinedRooms"
import {SocketContext} from "./ChatLayout";
import {rooms} from "../../../../global/Interfaces"

interface propsType {
  type: 'public' | 'protected' | 'private';
}

function RoomItem({item}: {item: rooms}) {
  const [isActive, setIsActive] = useState(false);
  const {room, setRoom} = useContext(SocketContext)
  
  return (
    <div
      className={`${isActive ? 'active' : ''} room h-14 p-2 flex justify-between items-center px-7 cursor-pointer`}
      onClick={() => {setRoom(item)}}>
      {/* <NavLink to={room.id} style={({isActive}) => setIsActive(isActive)}> */}
          <div className="room-header flex gap-5">
          <img src={cube} alt="" />
          {item.channel_name}
          </div>
      {/* </NavLink> */}
    </div>
  )
}

export default function Rooms({type} : propsType) {

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
      {Object.values(roomsToRender).map((item) => (
        <RoomItem key={item.id} item={item} />
      ))}
    </>
  )
}