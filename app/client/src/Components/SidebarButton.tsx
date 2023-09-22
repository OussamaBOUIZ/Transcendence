import React from 'react'
import {NavLink, useLocation} from 'react-router-dom'
interface PropType {
    to: string;
    children: React.ReactNode;
}
export default function SidebarButton ({to, children}:PropType) {
    const {pathname} = useLocation()
    function handleProfile() {
        if (to.includes(`/profile/`) && pathname.includes('/profile'))
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