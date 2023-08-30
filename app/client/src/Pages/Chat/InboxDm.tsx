import React, { useContext, useEffect, useState } from 'react'
import MessageOverview from './MessageOverview';
import { InboxItem } from '../../../../global/Interfaces';
import InboxContext from '../../Context/InboxContext';
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';

export default function InboxDm () {
    const {inboxList, setInboxList, update} = useContext(InboxContext);
    console.log('update : ', update)
    // useEffect(() => {
    //     console.log('UPDATE');
    //     setInboxList((prevInbox:InboxItem[]) => {
    //         return prevInbox.sort((a:InboxItem, b:InboxItem) => {
    //             // const newDate: Date = new Date(a.C)
    //             console.log('a: ', a.CreatedAt, 'b : ', b.CreatedAt);
    //             // (a.CreatedAt - b.CreatedAt)
    //             return 1
    //         })
    //     })
    // }
    // , [update])

    return (
        <div className="chat_inbox">
            {inboxList?.map((item:InboxItem) => {
                return (
                <MessageOverview 
                    key={item.id}
                    id={item?.user?.id}
                    lastMsg={item?.lastMessage}
                    unsMsg={item.unseenMessages ? item.unseenMessages: 0}
                    time=""
                    username={item?.user?.username}
                    />
                )
            })}
        </div>
    );
}