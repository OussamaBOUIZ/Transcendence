import React from 'react'
import {NavLink} from 'react-router-dom'

export default function MessageOverview ({id} : {id:number}) {

    return (
        <NavLink 
        to={`/chat/${id}`} 
        className={`message_oview 
                 ${(isActive: boolean) => isActive ? 'active' : ''}`}
        >
            <img src="../src/Assets/cat.jpg" alt="Cat pic" />
            <figcaption>
                <h4>Elegant</h4>
                <p>Nothing received</p>
            </figcaption>
            <time>Yesterday</time>
        </NavLink>
    );
}

