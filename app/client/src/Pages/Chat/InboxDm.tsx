import React, {useContext, useEffect, useState} from 'react'
import MessageOverview from './MessageOverview';
import InboxContext from '../../Context/InboxContext';
import { InboxItem } from '../../../../global/Interfaces';
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';

export default function InboxDm () {
    const {inboxList} = useContext(InboxContext)
    const [inbox, setInbox] = useState<InboxItem[]>(inboxList);

    console.log('inboxList', inboxList);
    useEffect(() => {
        setInbox(inboxList)
    }, [inboxList])

    return (
        <div className="chat_inbox">
            {inbox?.map((item:InboxItem) => {
                return (
                <MessageOverview 
                    key={item?.id}
                    id={item?.id}
                    lastMsg={item?.lastMessage}
                    time="undefined"
                    />)
            })}
        </div>
    );
}