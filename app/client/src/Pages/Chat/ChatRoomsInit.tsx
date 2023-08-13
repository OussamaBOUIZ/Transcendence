import React from 'react'
import ChannelInitAction from "./ChannelInitAction";

export default function ChatRooomsInit () {
    return (
        <div className="chat_main chat_main_init">
            <article>
                <h2>
                <img width="48" height="48" src="https://img.icons8.com/emoji/48/waving-hand-emoji.png" alt="waving-hand-emoji"/>
                Hi There!
                </h2>
                <h2>
                Create your first channel
                </h2>
                <p>
                Embark on an extraordinary journey of collaboration
                and inspiration or Join existing ones
                </p>
            </article>
            <ChannelInitAction />
        </div>
    );
}