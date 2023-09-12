import React, { useContext } from 'react';
import {useLocation} from 'react-router-dom';
import ChannelInitAction from "./ChannelInitAction"
import ChatDmInit from './ChatDmInit';
import InboxContext from '../../Context/InboxContext';

interface PropType {
    children: (React.JSX.Element | null)[],
    id: string | undefined;
}

export default function ChatWindow({children, id}: PropType) {
    
    const {pathname} = useLocation()
    const {outerDiv, innerDiv, isBanned} = useContext(InboxContext)

    const chatRegex = /^\/chat(\/)?$/;
    const chatRoomsRegex = /^\/chat\/rooms(\/)?$/;

    if (!id) {
        return (
            <section className={`chat_window bg-chat-body ${isBanned ? 'bg-black opacity-20' : ''}`} ref={outerDiv} style={{position: 'relative', height: '100%', overflowY: 'scroll'}}>
                <div className="w-full h-full flex justify-center items-center" ref={innerDiv} style={{position: 'relative'}}>
                    {chatRegex.test(pathname) && <ChatDmInit />}
                    {chatRoomsRegex.test(pathname) && <ChannelInitAction />}
                </div>
            </section>
        )
    }

    return (
        <section className={`chat_window bg-chat-body ${isBanned ? 'bg-black opacity-20' : ''}`} ref={outerDiv} style={{position: 'relative', height: '100%', overflowY: 'scroll'}}>
            <div ref={innerDiv} style={{position: 'relative'}}>
                {children}
            </div>
        </section>
    )
}