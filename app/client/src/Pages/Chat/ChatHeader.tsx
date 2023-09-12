import React, { useContext } from 'react'
import arrow from "../../Assets/Icons/arrow.png"
import UserContext from '../../Context/UserContext';
import menu from "../../Assets/Icons/menu.png"
import { useMediaQuery } from "@uidotdev/usehooks";

export default function ChatHeader ({id, username, status, avatar}: {id: string | undefined, username:string | undefined, status: string, avatar:string | undefined}) {
    const {socket, user, setShow} = useContext(UserContext)
    const isSmallDevice = useMediaQuery("only screen and (max-width : 820px)");

    if (!id) {
        return (
            <header className='chat_header'>
                <figure>
                    {isSmallDevice && <img className='w-8 h-8' src={arrow} alt="" onClick={() => setShow('inbox')}/>}
                </figure>
            </header>    
        )
    }

    function handleInv() {
        socket?.emit('receiveInvitation', {userId: user.id, guestId: id})
    }
    
    return (
        <header className='chat_header'>
            <figure>
                {isSmallDevice && <img className='w-8 h-8 cursor-pointer' src={arrow} alt="" onClick={() => setShow('inbox')}/>}
                <img className="w-14 h-14" src={avatar} alt="" />
                <figcaption>
                    <h4>{username}</h4>
                    <p>{status}</p>
                </figcaption>
            </figure>
            <figure>
                <button onClick={handleInv}>
                    Play Now
                </button>
                {isSmallDevice && <img className='w-8 h-8 cursor-pointer' src={menu} alt="" onClick={() => setShow('overview')}/>}
            </figure>
        </header>
    );
}