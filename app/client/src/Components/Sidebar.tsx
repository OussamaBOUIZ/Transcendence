import React from 'react'
import SidebarButton from './SidebarButton'
import {BsChatSquareFill } from 'react-icons/bs'
import {GoHomeFill} from 'react-icons/go'
import {FaUserFriends, FaGamepad, FaSignOutAlt} from 'react-icons/fa'
import {IoMdSettings} from 'react-icons/io'
import {nanoid} from 'nanoid'


import '../scss/sidebar.scss'
import { Link } from '../../../../node_modules/react-router-dom/dist/index'

export default function Sidebar () {
    const allIcons = [
        {id: nanoid() ,value: <GoHomeFill />, link:"/",style: "sidebar_button", active: true},
        {id: nanoid() ,value: <BsChatSquareFill />, link:"/chat",style: "sidebar_button", active: false},
        {id: nanoid() ,value: <FaGamepad />, link:"/game",style: "sidebar_button", active: false},
        {id: nanoid() ,value: <FaUserFriends />, link:"/friends",style: "sidebar_button", active: false},
        {id: nanoid() ,value: <IoMdSettings />, link:"/settings",style: "sidebar_button", active: false},
        {id: nanoid() ,value: <FaSignOutAlt />, link:"/logout",style: "sidebar_button logout", active: false}
    ]

    const [sdButtons, setSdButtons] = React.useState(allIcons);

    function toggle (id: string) {
        setSdButtons(prevSdButtons => prevSdButtons.map(item => {
            return item.id === id ? {...item, active: true} : {...item, active: false}
        }))
    }
    
    const sidebarButtons = sdButtons.map(item => {
        return (
            <SidebarButton 
            key={item.id} 
            className={`${item.style}`}
            id={`${item.active ? "active" : ""}`}
            toggle={() => toggle(item.id)}
            to={item.link}
            >
                {item.value}
            </SidebarButton> 
        )
    })
    return (
        <>
            <div className='backgroundShadow'></div>
            <div className="sidebar">
                {sidebarButtons}
            </div>
        </>
    );
}