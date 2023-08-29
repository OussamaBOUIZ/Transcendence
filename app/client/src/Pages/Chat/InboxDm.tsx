import React, { useContext, useMemo } from 'react'
import MessageOverview from './MessageOverview';
import { InboxItem } from '../../../../global/Interfaces';
import InboxContext from '../../Context/InboxContext';
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';

export default function InboxDm () {
    const {inboxList} = useContext(InboxContext);
    useEffectOnUpdate(() => console.log('inboxlist update', inboxList), [inboxList])
    return (
        <div className="chat_inbox">
            {inboxList?.map((item:InboxItem) => {
                return (
                <MessageOverview 
                    key={item.id}
                    id={item?.user?.id}
                    lastMsg={item?.lastMessage}
                    unsMsg={item.unseenMessage ? item.unseenMessage: 0}
                    time=""
                    username={item?.user?.username}
                    />
                    )
            })}
        </div>
    );
}