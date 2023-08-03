import React from 'react'

<<<<<<< HEAD:app/client/src/components/SidebarButton.tsx
export default function SidebarButton ({className, id, children, toggle}) {
    return (
        <>
            <div className={`sidebar-shadow ${className}`}>
                <div className={`${className} ${id}`} onClick={toggle}>
                    {children}
                </div>
            </div>
        </>
=======
export default function SidebarButton ({className, children, toggle}) {
    return (
        <div className={className} onClick={toggle}>
        {children}
        </div>
>>>>>>> c17289cd3a1bc26ecbe751bfe3743cc05c39f1cc:app/client/src/Components/SidebarButton.tsx
    );
}