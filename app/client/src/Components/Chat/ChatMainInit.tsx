import React from 'react'

export default function ChatMainInit () {
    const content = [
        {
            firstH2: "Begin now your", 
            secondH2: "friend-finding journey",
            subHeading: "Use the search feature to seek out friends\
            to connect, and grow your social circle"
        },
        {
            firstH2: "Hi There!", 
            secondH2: "Create your first channel",
            subHeading: "Embark on an extraordinary journey of collaboration\
            and inspiration or Join existing ones"
        }
    ]

    return (
        <div className="chat_main chat_main_init">
            <article>
            <h2>
            <img width="48" height="48" src="https://img.icons8.com/emoji/48/waving-hand-emoji.png" alt="waving-hand-emoji"/>
                {content[1].firstH2}
            </h2>
            <h2>
                {content[1].secondH2}
            </h2>
            <p>
                {content[1].subHeading}
            </p>
        </article>
        <section className="search_box">
            <label>Search</label>
            <input type="search" name="" id="" placeholder="Type a username"/>
        </section>
        </div>
    );
}