import React, {useContext} from 'react'
import muteIcon from "../../Assets/Icons/mute.svg"
import kickIcon from "../../Assets/Icons/kick.svg"
import blockIcon from "../../Assets/Icons/block.svg"
import promoteIcon from "../../Assets/Icons/upgrade.svg"
import {nanoid} from "nanoid"
import {UpdateContext} from "./ChatOverview"
import axios from "axios"



export default function AdminPopUp({ channelId, id }: {channelId: number, id: number}) {
    async function promoteMember() {
        try {
            const res = await axios.post(`/api/channel/promoteuser/${id}?channelId=${channelId}`)
            console.log(res)
            setUpdate(update + 1)
        }
        catch (err) {
            console.log(err)
        }
    }

    async function kickMember() {
        try {
            const res = await axios.post(`/api/channel/`)
            console.log(res)
        }
        catch (err) {
            console.log(err)
        }
    }

    async function blockMember() {
        try {
            const res = await axios.post(`/api/channel/`)
            console.log(res)
        }
        catch (err) {
            console.log(err)
        }
    }

    async function muteMember() {
        try {
            const res = await axios.post(`/api/channel/`)
            console.log(res)
        }
        catch (err) {
            console.log(err)
        }
    }

    async function handleClick(name: string) {
        switch (name) {
            case "promote":
                await promoteMember()
                break;
            case "kick":
                await kickMember()
                break;
            case "block":
                await blockMember()
                break;
            default:
                await muteMember()
                break;
        }
    }

    const allIcons = [
        {id: nanoid() ,value: promoteIcon, name:"promote"},
        {id: nanoid() ,value: kickIcon, name:"kick"},
        {id: nanoid() ,value: blockIcon, name:"block"},
        {id: nanoid() ,value: muteIcon, name:"mute"}
    ]

    const IconsArea = allIcons.map(icon => {
        return (
            <img key={icon.id} className="cursor-pointer" src={icon.value} alt="" onClick={() => void handleClick(icon.name)}/>
        )
    })

    const {update, setUpdate} = useContext(UpdateContext)

    return (
        <div className='bg-violet-700 bg-opacity-90 flex items-center justify-evenly absolute top-0 left-0 w-full h-full'>
            {IconsArea}
        </div>
    )
}