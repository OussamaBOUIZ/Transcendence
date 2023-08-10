import React from 'react'
import {NavLink} from 'react-router-dom'

export default function SidebarButton ({to, className, children}) {
    const [activeLink, setActiveLink] = React.useState(false)
    return (
        <div 
        className={`${className} 
                    ${activeLink ? "active" : ""} 
                    ${to === "/logout" && "logout"}`}
        >
            <NavLink to={to} 
            style={({isActive}) => setActiveLink(isActive)}
            >
            {children}
            </NavLink>
        </div>
    );
}