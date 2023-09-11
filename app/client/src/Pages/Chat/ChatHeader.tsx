import React from 'react'

export default function ChatHeader ({id, username, status, avatar}: {id: string | undefined, username:string | undefined, status: string, avatar:string | undefined}) {
    if (!id)
        return (null)
    return (
        <header className='chat_header'>
            <figure>
                <img src={avatar} alt="" />
                <figcaption>
                    <h4>{username}</h4>
                    <p>{status}</p>
                </figcaption>
            </figure>
                <button>
                    Play Now
                </button>
        </header>
    );
}