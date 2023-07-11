import React from 'react'
import SidebarButton from './SidebarButton'

import '../scss/sidebar.scss'

export default function Sidebar () {
    
    return (
        <div className="sidebar">
            <SidebarButton />            
            <SidebarButton />            
            <SidebarButton />            
            <SidebarButton />            
            <SidebarButton style={{marginTop: "auto"}}/>            
        </div>
    );
}