import React from 'react'
import ViewIcon from "../../Assets/Icons/eye-regular.svg"
import add from "../../Assets/Icons/add.svg"
import friend from "../../Assets/Icons/friend.svg"


export default function UserPopUp() {
    return (
        <div className='bg-violet-700 bg-opacity-90 flex items-center justify-evenly absolute top-0 left-0 w-full h-full'>
            <div className='flex gap-4 text-sm items-center'>
                <img className="cursor-pointer" src={add} alt="add" />
                Add Friend
            </div>
            <div className='flex gap-4 text-sm items-center'>
                <img className="cursor-pointer" src={friend} alt="friend" />
                Friend
            </div>
            <div className='flex gap-4 items-center'>
                <img className="cursor-pointer w-7" src={ViewIcon} alt="ViewIcon" />
                view
            </div>
        </div>
    )
}