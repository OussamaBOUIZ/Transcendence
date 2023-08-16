import React, {createContext} from 'react'
import ContactDetail from './ContactDetail';
import ChannelInfo from "./ChannelInfo"
import { getUserData } from '../../Hooks/getUserData';

// export const myContext = createContext();

export default function ChatOverview () {

    const user = getUserData()

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
        <ChannelInfo user={user}/>
    {/* <ContactDetail /> */}
    </div>);
}