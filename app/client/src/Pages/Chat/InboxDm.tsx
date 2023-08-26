import React, {useContext, useEffect} from 'react'
import MessageOverview from './MessageOverview';
import InboxContext from '../../Context/InboxContext';

export default function InboxDm () {
    const {inboxList} = useContext(InboxContext)
    
    useEffect(() => {
        // fetch inbox list
        console.log('Fetching the inbox list...');
    }, [])

    return (
        <div className="chat_inbox">
            <MessageOverview id={1}/>
        </div>
    );
}