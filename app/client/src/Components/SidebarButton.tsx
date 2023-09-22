import React from 'react'
import {NavLink} from 'react-router-dom'
interface PropType {
    to: string;
    children: React.ReactNode;
}
export default function SidebarButton ({to, children}:PropType) {
    function handleProfile() {
        window.location.href = to
    }
    return (
        <NavLink
            to={to}
            onClick={handleProfile}
            className={`sidebar_button ${(isActive:boolean) => isActive ? 'active' : ''} ${to === "/logout" && "logout"}`}>
                {children}
        </NavLink>
    );
}