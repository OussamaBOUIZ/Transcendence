import React, { useContext } from 'react'
import { SocketContext } from './ChatRooms';
import cube from "../../Assets/Icons/cube.svg"
import settings from "../../Assets/Icons/gear-solid.svg"
import addUser from "../../Assets/Icons/addUser.svg"
import InboxContext from '../../Context/InboxContext';
import { useMediaQuery } from "@uidotdev/usehooks";
import arrow from "../../Assets/Icons/arrow.png"
import menu from "../../Assets/Icons/menu.png"
import UserContext from '../../Context/UserContext';


export default function RoomHeader () {
    const {id, roomData, setShowSearch, myGrade, setAction, setIsClick} = useContext(SocketContext)
    const {isBanned} = useContext(InboxContext)
    const {show, setShow} = useContext(UserContext)
    const isSmallDevice = useMediaQuery("only screen and (max-width : 820px)");

    function handleChange() {
        setAction("update")
        setIsClick(prev => !prev)
    }

    if (!id)
        return <header className={`chat_header bg-room-bar ${show === 'main' ? 'on' : 'off'}`}></header>

    return (
        <header className={`chat_header bg-room-bar ${show === 'main' ? 'on' : 'off'}`}>
            <div className='flex gap-7 text-xl items-center'>
                {isSmallDevice && <img className='w-8 h-8' src={arrow} alt="" onClick={() => setShow('inbox')}/>}
                <img className="w-10" src={cube} alt="" />
                <figcaption>
                    <h4>{roomData.channelName}</h4>
                </figcaption>
            </div>
            <div className="flex ml-auto gap-4 justify-around">
                {myGrade !== "user" && !isBanned && <img className="w-8 cursor-pointer" onClick={() => {setShowSearch(prev => !prev)}} src={addUser} alt="addUser" />}
                <img className="w-8 cursor-pointer" onClick={handleChange} src={settings} alt="settings" />
                {isSmallDevice && <img className='w-8 h-8' src={menu} alt="" onClick={() => setShow('overview')}/>}
            </div>
        </header>
    );
}