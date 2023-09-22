import React, { useContext } from 'react'
import SidebarButton from './SidebarButton'
import {BsChatSquareFill } from 'react-icons/bs'
import {GoHomeFill} from 'react-icons/go'
import {FaUserFriends, FaUserAlt, FaSignOutAlt} from 'react-icons/fa'
import {IoMdSettings} from 'react-icons/io'
import {nanoid} from 'nanoid'
import '../scss/sidebar.scss'
import UserContext from '../Context/UserContext'

export default function Sidebar () {

    const {user} = useContext(UserContext)

    const allIcons = [
        {id: nanoid() ,to:"/",value: <GoHomeFill />},
        {id: nanoid() ,to:"/chat",value: <BsChatSquareFill />},
        {id: nanoid() ,to:`/profile/${user.username}` ,value: <FaUserAlt />},
        {id: nanoid() ,to:"/friends",value: <FaUserFriends />},
        {id: nanoid() ,to:"/settings",value: <IoMdSettings />},
        {id: nanoid() ,to:"/logout",value: <FaSignOutAlt />}
    ]

    const sidebarButtons = allIcons.map(icon => {
        return (
            <SidebarButton key={icon.id} to={icon.to} >
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