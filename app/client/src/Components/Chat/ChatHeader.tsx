import React from 'react'

export default function ChatHeader () {
    return (
        <header className='chat_header'>
            <figure>
                <img src="./src/Assets/cat1.jpg" alt="cat.jpg" />
                <figcaption>
                    <h4>ELEGANT TOM</h4>
                    <p>online</p>
                </figcaption>
            </figure>
                <button>
                    Play Now
                </button>
        </header>
    );
}