import React from 'react'
import {NavLink} from 'react-router-dom'

export default function MessageOverview ({id} : {id:number}) {
    const [activeStyle, setActiveStyle] = React.useState<boolean>(false);

    return (
        <NavLink 
        to={`/chat/${id}`}
        style={(isActive: boolean) => setActiveStyle(isActive)}
        >
        <figure className={`message_oview ${activeStyle ? "active": ""}`}>
            <img src="../src/Assets/cat.jpg" alt="Cat pic" />
            <figcaption>
                <h4>Elegant</h4>
                <p>Nothing received</p>
            </figcaption>
            <time>Yesterday</time>
        </figure>
        </NavLink>
    );
}