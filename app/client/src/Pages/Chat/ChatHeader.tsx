import React from 'react'

export default function ChatHeader ({username, online}) {
    return (
        <header className='chat_header'>
            <figure>
                <img src="" alt="cat.jpg" />
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