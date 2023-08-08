import React from 'react'

export default function MessageOverview ({current}) {
    return (
        <figure className={`message_oview ${current ? "active" : ""}`}>
            <img src="./src/Assets/cat.jpg" alt="Cat pic" />
            <figcaption>
                <h4>Elegant</h4>
                <p>Nothing received</p>
            </figcaption>
            <time>Yesterday</time>
        </figure>
    );
}