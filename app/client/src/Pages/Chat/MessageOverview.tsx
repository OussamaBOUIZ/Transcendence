import React from 'react'
import {NavLink} from 'react-router-dom'
import { shortenMessage } from '../../Helpers/utils';
interface PropType {
    id:number;
    lastMsg: string;
    time: string;
    unsMsg:number;
    username:string;
    img: string;
}

export default function MessageOverview ({id, lastMsg, time, unsMsg, username, img} :PropType) {

    return (
        <NavLink 
        to={`/chat/${id}`} 
        className={`message_oview 
                 ${(isActive: boolean) => isActive ? 'active' : ''}`}
        >
            <img src={img} alt="Cat pic" />
            <figcaption>
                <h4>{username}</h4>
                <p>{shortenMessage(lastMsg)}</p>
            </figcaption>
            <time>{time}</time>
            {unsMsg !== 0 && <span className=' rounded-lg block bg-pink-500 px-2 h-5 text-sm'>{unsMsg}</span>}
        </NavLink>
    );
}

