import React, {useContext} from "react"
import {nanoid} from 'nanoid';
import { SocketContext } from "./ChatLayout";

export default function MutePopUp({channelId, id}: {channelId: number, id: number}) {

    const {socket, roomData} = useContext(SocketContext)

    const array = [
        {id: nanoid(), value: 5, type: 'minutes'},
        {id: nanoid(), value: 1, type: 'hour'}
    ]

    function handleClick(time: {id: string, value: number, type: string}) {
        const data ={userId: id, channelName: roomData.channelName, minutes: (time.type === 'hour') ? time.value * 60 : time.value}
        socket?.emit('muteuser', data)
    }

    const toggle = array.map(time => {return(
        <button className="border border-white border-opacity-20 hover:bg-white hover:border-violet-700 hover:text-violet-500 rounded-lg border-1 w-full cursor-pointer" onClick={() => handleClick(time)} >{time.value} {time.type}</button>
    )})

    return (
        <div className="bg-violet-700 flex gap-2 absolute top-0 left-0 w-full h-full p-2">
            {toggle}
        </div>
    )
}