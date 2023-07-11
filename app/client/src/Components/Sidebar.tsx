import React from 'react'
import SidebarButton from './SidebarButton'
import {BsChatSquareFill } from 'react-icons/bs'
import {GoHomeFill} from 'react-icons/go'
import {FaUserFriends, FaGamepad, FaSignOutAlt} from 'react-icons/fa'
import {IoMdSettings} from 'react-icons/io'
import {nanoid} from 'nanoid'


import '../scss/sidebar.scss'

export default function Sidebar () {
    const allIcons = [
        {id: nanoid() ,value: <GoHomeFill />, style: "sidebar_button", active: false},
        {id: nanoid() ,value: <BsChatSquareFill />, style: "sidebar_button", active: true},
        {id: nanoid() ,value: <FaUserFriends />, style: "sidebar_button", active: false},
        {id: nanoid() ,value: <FaGamepad />, style: "sidebar_button", active: false},
        {id: nanoid() ,value: <IoMdSettings />, style: "sidebar_button", active: false},
        {id: nanoid() ,value: <FaSignOutAlt />, style: "sidebar_button logout", active: false}
    ]

    const [sdButtons, setSdButtons] = React.useState(allIcons);

    // function toggle (id) {
    //     setSdButtons(prevSdButtons => {
    //         return (prevSdButtons.map(item => {
    //                 return (item.id === id ? {...item, active: true} : {...item, active: false})
    //             })
    //         })
    //     })
    // }

    function toggle (id) {
        setSdButtons(prevSdButtons => prevSdButtons.map(item => {
            return item.id === id ? {...item, active: true} : {...item, active: false}
        }))
    }
    
    const sidebarButtons = sdButtons.map(icon => {
        return (
            <SidebarButton 
            key={icon.id} 
            className={`${icon.style} ${icon.active ? "active" : ""}`}
            toggle={() => toggle(icon.id)}
            >
                {icon.value}
            </SidebarButton> 
        )
    })
    return (
        <div className="sidebar">
            {sidebarButtons}
        </div>
    );
}