import React from 'react'
import ChannelInitAction from './ChannelInitAction';
import ChatOverview from './ChatOverview';
import ChatSearchBox from './ChatSearchBox';


export default function ChatMainInit () {
    const content = [
        {
            firstH2: "Begin now your", 
            secondH2: "friend-finding journey",
            subHeading: "Use the search feature to seek out friends\
            to connect, and grow your social circle",
            callToAction: <ChatSearchBox />
        },
        {
            firstH2: "Hi There!", 
            secondH2: "Create your first channel",
            subHeading: "Embark on an extraordinary journey of collaboration\
            and inspiration or Join existing ones",
            callToAction: <ChannelInitAction />
        }
    ]
    const index = 0;
    return (
        <>
        <div className="chat_main chat_main_init">
            <article>
            <h2>
            <img width="48" height="48" src="https://img.icons8.com/emoji/48/waving-hand-emoji.png" alt="waving-hand-emoji"/>
                {content[index].firstH2}
            </h2>
            <h2>
                {content[index].secondH2}
            </h2>
            <p>
                {content[index].subHeading}
            </p>
        </article>
        {content[index].callToAction}
        </div>
        <ChatOverview />
        </>
    );
}