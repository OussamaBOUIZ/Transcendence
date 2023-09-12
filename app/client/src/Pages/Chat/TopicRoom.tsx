import React, {useContext} from "react"
import {FaPlus} from "react-icons/fa";
import {IoChevronDown} from "react-icons/io5";
import {IoChevronForward} from "react-icons/io5";
import { SocketContext } from "./ChatRooms";

export default function TopicRoom({roomType, mode, setter} : {roomType: string, mode: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>}) {

    const {setIsClick} = useContext(SocketContext)


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
                <FaPlus className="cursor-pointer" onClick={() => {setIsClick(prev => !prev)}} />
            </div>
        </>
    )
}