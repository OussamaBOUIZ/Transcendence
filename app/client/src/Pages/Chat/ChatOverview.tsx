import React from 'react'
import ContactDetail from './ContactDetail';
import ChannelInfo from "./ChannelInfo"

export default function ChatOverview () {

    const guidingText = "As channels come alive this box will \
    soon be filled with fellow members. Engage in captivating conversations, share\
    experiences, and foster \
    connections with\
    like-minded individuals\
    ";

    return (<div className="chat_overview overflow-hidden"> 
        {/* <p className="guide_text">
            {guidingText}
        </p> */}
        <ChannelInfo />
    {/* <ContactDetail /> */}
    </div>);
}