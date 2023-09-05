import React, { useContext, useEffect, useState } from 'react'
import MessageOverview from './MessageOverview';
import { InboxItem } from '../../../../global/Interfaces';
import InboxContext from '../../Context/InboxContext';
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';
import {getUserImage} from "../../Hooks/getUserImage"


export default function InboxDm () {

    const {inboxList, setInboxList, update} = useContext(InboxContext);
    useEffect(() => {
        setInboxList((prevInbox:InboxItem[]) => {
            return prevInbox.sort((a:InboxItem, b:InboxItem) => {
                const dateA:Date = new Date(a.CreatedAt);
                const dateB:Date = new Date(b.CreatedAt);
                return dateB.getTime() - dateA.getTime();
            });
        })
}, [update])


    useEffect(() => {
        inboxList?.map(async (item) => {
            const img = await getUserImage(item.author.id)
            item.image = img;
            return item;
        })
    }, [inboxList])
        

    return (
        <div className="chat_inbox">
            {inboxList?.map((item:InboxItem, idx:number) => {
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