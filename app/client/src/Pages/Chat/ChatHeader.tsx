import React, { useContext } from 'react'
import { useState } from 'react';
import GameCards from '../../Components/GameCards';
import UserContext from '../../Context/UserContext';

export default function ChatHeader ({id, username, online, avatar}: {id: string | undefined, username:string | undefined, online: boolean, avatar:string | undefined}) {
    if (!id)
        return (null)
    const {user} = useContext(UserContext)
    const [display, setDisplay] = useState<boolean>(false);


    return (
        <>
        {display && <GameCards hostId={String(user.id)} guestId={id} setter={setDisplay}/>}
        <header className='chat_header'>
            <figure>
                <img src={avatar} alt="cat.jpg" />
                <figcaption>
                    <h4>{username}</h4>
                    <p>{online ? "online" : ""}</p>
                </figcaption>
            </figure>
                <button onClick={() => setDisplay((prevVal) => !prevVal)}>
                    Play Now
                </button>
        </header>
        </>
    );
}