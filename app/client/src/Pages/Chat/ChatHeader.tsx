import React from 'react'
import { useState } from 'react';
import GameCarousel from '../../Components/GameCarousel';

export default function ChatHeader ({id, username, online, avatar}: {id: string | undefined, username:string | undefined, online: boolean, avatar:string | undefined}) {
    if (!id)
        return (null)
    const [display, setDisplay] = useState<boolean>(false);


    return (
        <>
        {display && <GameCarousel />}
        <header className='chat_header'>
            <figure>
                <img src={avatar} alt="cat.jpg" />
                <figcaption>
                    <h4>{username}</h4>
                    <p>{online ? "online" : ""}</p>
                </figcaption>
            </figure>
                <button onClick={() => setDisplay(true)}>
                    Play Now
                </button>
        </header>
        </>
    );
}