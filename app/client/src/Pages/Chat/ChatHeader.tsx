import React from 'react'

export default function ChatHeader ({username, online, avatar}: {username:string | undefined, online: boolean, avatar:string | undefined}) {
    return (
        <header className='chat_header'>
            <figure>
                <img src={avatar} alt="cat.jpg" />
                <figcaption>
                    <h4>{username}</h4>
                    <p>{online ? "online" : ""}</p>
                </figcaption>
            </figure>
                <button>
                    Play Now
                </button>
        </header>
    );
}