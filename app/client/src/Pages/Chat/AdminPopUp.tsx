import React, {useState, useEffect} from 'react'
import muteIcon from "../../Assets/Icons/mute.svg"
import kickIcon from "../../Assets/Icons/kick.svg"
import blockIcon from "../../Assets/Icons/block.svg"
import promotIcon from "../../Assets/Icons/upgrade.svg"
import {nanoid} from "nanoid"
import axios from "axios"



export default function AdminPopUp({ id }: {id: number}) {

    function promotMember() {
        const action = async () => {
            try {
                const res = await axios.get(`/api/channel/`)
                console.log(res)
            }
            catch (err) {
                console.log(err)
            }
        }
        action()
    }

    function kickMember() {
        const action = async () => {
            try {
                const res = await axios.get(`/api/channel/`)
                console.log(res)
            }
            catch (err) {
                console.log(err)
            }
        }
        action()
    }

    function blockMember() {
        const action = async () => {
            try {
                const res = await axios.get(`/api/channel/`)
                console.log(res)
            }
            catch (err) {
                console.log(err)
            }
        }
        action()
    }

    function muteMember() {
        const action = async () => {
            try {
                const res = await axios.get(`/api/channel/`)
                console.log(res)
            }
            catch (err) {
                console.log(err)
            }
        }
        action()
    }

    function handleClick(name: string) {
        switch (name) {
            case "promot":
                promotMember()
                break;
            case "kick":
                kickMember()
                break;
            case "block":
                blockMember()
                break;
            default:
                muteMember()
                break;
        }
    }

    const allIcons = [
        {id: nanoid() ,value: promotIcon, name:"promot"},
        {id: nanoid() ,value: kickIcon, name:"kick"},
        {id: nanoid() ,value: blockIcon, name:"block"},
        {id: nanoid() ,value: muteIcon, name:"mute"}
    ]

    const IconsArea = allIcons.map(icon => {
        return (
            <img key={icon.id} className="cursor-pointer" src={icon.value} alt="" onClick={() => handleClick(icon.name)}/>
        )
    })

    return (
        <div className='bg-violet-700 bg-opacity-90 flex items-center justify-evenly absolute top-0 left-0 w-full h-full'>
            {IconsArea}
        </div>
    )
}