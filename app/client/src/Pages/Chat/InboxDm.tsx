import React, {useContext, useEffect} from 'react'
import MessageOverview from './MessageOverview';
import InboxContext from '../../Context/InboxContext';
import { InboxItem } from '../../../../global/Interfaces';

export default function InboxDm () {
    const {inboxList} = useContext(InboxContext)
    console.log('inboxList', inboxList);

    return (
        <div className="chat_inbox">
            {inboxList?.map((item:InboxItem) => {
                return (
                <MessageOverview 
                    id={item?.id}
                    lastMsg={item?.lastMessage}
                    time="undefined"
                    />)
            })}
        </div>
    );
}