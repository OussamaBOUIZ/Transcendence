import React from 'react'
import {NavLink} from 'react-router-dom'

export default function MessageOverview ({id, lastMsg, time} : {id:number, lastMsg: string, time: string}) {

    return (
        <NavLink 
        to={`/chat/${id}`} 
        className={`message_oview 
                 ${(isActive: boolean) => isActive ? 'active' : ''}`}
        >
            <img src="../src/Assets/cat.jpg" alt="Cat pic" />
            <figcaption>
                <h4>User: {id}</h4>
                <p>{lastMsg}</p>
            </figcaption>
            <time>{time}</time>
        </NavLink>
    );
}

