import React, {useState} from "react"
import {FaPlus} from "react-icons/fa";
import {IoChevronDown} from "react-icons/io5";
import {IoChevronForward} from "react-icons/io5";

export default function TopicRoom({roomType, mode, setter, clicked} : {roomType: string, mode: boolean, setter: any, clicked: any}) {

    function handleChange() {
        setter(prev => !prev)
    }

    let icon;
    (mode) ? icon = <IoChevronDown className="cursor-pointer" onClick={handleChange}/> : icon = <IoChevronForward className="cursor-pointer" onClick={handleChange}/>
    return (
        <>
            <div className="bg-room-bar topic h-9 p-2 flex items-center justify-between">
                <div className="topic-header flex items-center gap-2">
                    {icon}
                    {roomType}
                </div>
                <FaPlus className="cursor-pointer" onClick={() => {clicked(prev => !prev)}} />
            </div>
        </>
    )
}