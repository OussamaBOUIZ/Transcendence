import React from 'react'
import {Link} from 'react-router-dom'

export default function SidebarButton ({className, id, children, toggle, to}) {
    console.log(to)
    return (
        <>
            <div className={`sidebar-shadow ${className}`}>
                <Link className={`${className} ${id}`} to={to} onClick={toggle}>
                    {children}
                </Link>
            </div>
        </>
    );
}