import React from 'react'

export default function SidebarButton ({className, id, children, toggle}) {
    return (
        <>
            <div className={`sidebar-shadow ${className}`}>
                <div className={`${className} ${id}`} onClick={toggle}>
                    {children}
                </div>
            </div>
        </>
    );
}