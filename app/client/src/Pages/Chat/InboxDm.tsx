import React, { useContext, useEffect, useState } from 'react'
import MessageOverview from './MessageOverview';
import { InboxItem } from '../../../../global/Interfaces';
import InboxContext from '../../Context/InboxContext';
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';
import {getUserImage} from "../../Hooks/getUserImage"


export default function InboxDm () {

    const {inboxList, update} = useContext(InboxContext);
    useEffect(() => {
        inboxList.current = inboxList.current.sort((a:InboxItem, b:InboxItem) => {
                const dateA:Date = new Date(a.CreatedAt);
                const dateB:Date = new Date(b.CreatedAt);
                return dateB.getTime() - dateA.getTime();
            });
    }, [update])

    return (
        <div className="chat_inbox">
            {inboxList.current.map((item, idx) => {
                return (
                    <MessageOverview 
                        key={idx}
                        id={item?.author?.id}
                        lastMsg={item?.lastMessage}
                        unsMsg={item.unseenMessages ? item.unseenMessages: 0}
                        time=""
                        username={item?.author?.username}
                        img={item.image}
                    />
                )
            })}
        </div>
    );
}