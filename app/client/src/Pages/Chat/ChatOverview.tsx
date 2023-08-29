import React from 'react';
import ChannelInfo from './ChannelInfo';

export default function ChatOverview({id}: {id: string | undefined}) {

    const guidingText = "As channels come alive this box will \
    soon be filled with fellow members. Engage in captivating conversations, share\
    experiences, and foster \
    connections with\
    like-minded individuals\
    ";

    const customField = <div className='flex justify-center items-center w-full h-full px-2 text-center'><p>{guidingText}</p></div>

    return (
        <div className="chat_overview overflow-hidden">
            {!id && customField}
            {id && <ChannelInfo />}
        </div>
    );
}
