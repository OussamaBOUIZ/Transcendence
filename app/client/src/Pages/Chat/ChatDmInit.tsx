import React from 'react'
import ChatSearchBox from './ChatSearchBox';
import InboxDm from './InboxDm';

export default function ChatDmInit () {
    return (
        <>
        <InboxDm />
        <div className="chat_main chat_main_init">
            <article>
                <h1 className='text-center text-3xl font-bold'>👋 Begin now your<br></br>friend-finding journey</h1>
                <p className='text-center w-1/3 text-xl font-semibold'>Use the search feature to seek out friends to connect, and grow your social circle</p>
            </article>
            <ChatSearchBox />
        </div>
        </>
    );
}