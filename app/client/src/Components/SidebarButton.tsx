import React from 'react'
import {NavLink} from 'react-router-dom'
interface PropType {
    to: string;
    children: React.ReactNode;
}
export default function SidebarButton ({to, children}:PropType) {
    return (
        <NavLink 
            to={to}
            className={`sidebar_button 
                        ${(isActive:boolean) => isActive ? 'active' : ''}
                        ${to === "/logout" && "logout"}`
                        }>
            {children}
        </NavLink>
    );
}