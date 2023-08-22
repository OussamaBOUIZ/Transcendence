import React, {useContext} from 'react'
import muteIcon from "../../Assets/Icons/mute.svg"
import kickIcon from "../../Assets/Icons/kick.svg"
import banIcon from "../../Assets/Icons/block.svg"
import promoteIcon from "../../Assets/Icons/upgrade.svg"
import {nanoid} from "nanoid"
import {UpdateContext} from "./ChatOverview"
import axios from "axios"
import { SocketContext } from './ChatRooms'


export default function AdminPopUp({ channelId, id, setIsClicked}: {channelId: number, id: number, setIsClicked: any}) {

    const {socket, roomData} = useContext(SocketContext)
    const {setUpdate} = useContext(UpdateContext)

    async function promoteMember() {
        try {
            const res = await axios.post(`/api/channel/promoteuser/${id}?channelId=${channelId}`)
            console.log(res)
            setUpdate(prev => prev + 1)
        }
        catch (err) {
            console.log(err)
        }
    }

    function kickMember() {
        const data ={userId: id, channelName: roomData.channelName}
        socket?.emit('kickuser', data);
        setUpdate(prev => prev + 1)
    }

    function banMember() {
        const data ={userId: id, channelName: roomData.channelName}
        socket?.emit('banuser', data)
    }

    function muteMember() {
        const data ={userId: id, channelName: roomData.channelName, minutes: 1}
        socket?.emit('muteuser', data)
    }

    async function handleClick(name: string) {
        switch (name) {
            case "promote":
                await promoteMember()
                break;
            case "kick":
                kickMember()
                break;
            case "ban":
                banMember()
                break;
            default:
                setIsClicked(prev => !prev)
                // muteMember()
                break;
        }
    }

    const allIcons = [
        {id: nanoid() ,value: promoteIcon, name:"promote"},
        {id: nanoid() ,value: kickIcon, name:"kick"},
        {id: nanoid() ,value: banIcon, name:"ban"},
        {id: nanoid() ,value: muteIcon, name:"mute"}
    ]

    const IconsArea = allIcons.map(icon => {
        return (
            <img key={icon.id} className="cursor-pointer" src={icon.value} alt="" onClick={() => void handleClick(icon.name)}/>
        )
    })

    return (
        <div className='bg-violet-700 bg-opacity-90 flex items-center justify-evenly absolute top-0 left-0 w-full h-full'>
            {IconsArea}
        </div>
    )
}