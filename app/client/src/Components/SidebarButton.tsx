import React from 'react'

export default function SidebarButton ({className, children, toggle}) {
    return (
        <div className={className} onClick={toggle}>
        {children}
        </div>
    );
}