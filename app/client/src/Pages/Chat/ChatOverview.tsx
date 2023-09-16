import React, { useContext } from 'react';
import ChannelInfo from './ChannelInfo';
import { useLocation } from 'react-router';
import ContactDetail from './ContactDetail';
import { User } from '../../../global/Interfaces';
import UserContext from '../../Context/UserContext';

function CustomField ({content}: {content: string}) {
    return (
        <div className='flex justify-center items-center w-full h-full px-2 text-center'>
        <p>
            {content}
        </p>
    </div>
    )
}

export default function ChatOverview({oview, id}: {oview?: User, id: string | undefined}) {

    const {show} = useContext(UserContext)

    const roomGuideText = "As channels come alive this box will \
    soon be filled with fellow members. Engage in captivating conversations, share\
    experiences, and foster \
    connections with\
    like-minded individuals\
    ";

    const dmGuideText = "As Chat come alive this box will \
    soon be filled with fellow members. Engage in captivating conversations, share\
    experiences, and foster \
    connections with\
    like-minded individuals\
    ";

       
    const {pathname} = useLocation();

    let val;

    const chatRegex = /^\/chat(\/)?(\d+)?$/;
    const chatRoomsRegex = /^\/chat\/rooms(\/)?(\d+)?$/; 
    
    switch (true) {
      case chatRegex.test(pathname):
        val = (id) ? <ContactDetail title="Contact details" oview={oview} /> : <CustomField content={dmGuideText}/>;
        break;
      case chatRoomsRegex.test(pathname):
        val = (id) ? <ChannelInfo /> : <CustomField content={roomGuideText}/>;
        break;
    }
    


    return (
        <div className={`chat_overview overflow-hidden ${show === 'overview' ? 'on' : 'off'}`}>
            {val}
        </div>
    );
}
