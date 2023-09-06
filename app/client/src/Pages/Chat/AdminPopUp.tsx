import React, {useContext} from 'react'
import muteIcon from "../../Assets/Icons/mute.svg"
import kickIcon from "../../Assets/Icons/kick.svg"
import banIcon from "../../Assets/Icons/block.svg"
import promoteIcon from "../../Assets/Icons/upgrade.svg"
import {nanoid} from "nanoid"
import axios from "axios"
import { SocketContext } from './ChatRooms'


export default function AdminPopUp({ Userid, setIsClicked}: {Userid: number, setIsClicked: React.Dispatch<React.SetStateAction<boolean>>}) {

    const {id, socket, roomData, setUpdate} = useContext(SocketContext)

    async function promoteMember() {
        try {
            await axios.post(`/api/channel/promoteuser/${Userid}?channelId=${id}`)
            setUpdate(prev => prev + 1)
        }
        catch (err) {
            console.log(err)
        }
    }

    function kickMember() {
        const data ={userId: Userid, channelName: roomData.channelName}
        socket?.emit('kickuser', data);
        setTimeout(() => setUpdate(prev => prev + 1), 300)
    }

    function banMember() {
        const data ={userId: Userid, channelName: roomData.channelName}
        console.log(data)
        socket?.emit('banuser', data)
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