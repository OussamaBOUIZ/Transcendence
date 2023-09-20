import React, {useContext} from "react"
import {FaPlus} from "react-icons/fa";
import {IoChevronDown} from "react-icons/io5";
import {IoChevronForward} from "react-icons/io5";
import { SocketContext } from "./ChatRooms";

interface propsType {
    roomType: string;
    mode: boolean;
    value: string;
    setter: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TopicRoom({roomType, mode, value, setter} : propsType) {

    const {setIsClick, setDefaultRoomType} = useContext(SocketContext)

    let icon;
    (mode) ?
    icon = <IoChevronDown className="cursor-pointer" onClick={() => setter(prev => !prev)}/> :
    icon = <IoChevronForward className="cursor-pointer" onClick={() => setter(prev => !prev)}/>
    return (
        <>
            <div className="bg-chat-body topic h-9 p-2 md:text-sm xl:text-base flex items-center justify-between">
                <div className="topic-header flex items-center gap-2">
                    {icon}
                    {roomType}
                </div>
                <FaPlus className="cursor-pointer" onClick={() => {setDefaultRoomType(value); setIsClick(prev => !prev)}} />
            </div>
        </>
    )
}