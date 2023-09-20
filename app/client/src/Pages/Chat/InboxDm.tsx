import React, { useContext, useMemo } from 'react'
import MessageOverview from './MessageOverview';
import InboxContext from '../../Context/InboxContext';
import UserContext from '../../Context/UserContext';

export default function InboxDm() {
    const { inboxList, update } = useContext(InboxContext);
    const {show} = useContext(UserContext)

    // Memoize the sorted inboxList
    const sortedInboxList = useMemo(() => {
        return inboxList.current.sort((a, b) => {
            const dateA = new Date(a.CreatedAt);
            const dateB = new Date(b.CreatedAt);
            return dateB.getTime() - dateA.getTime();
        });
    }, [inboxList.current, update]);

    return (
        <div className={`chat_inbox ${show === 'inbox' ? 'on' : 'off'}`}>
            {sortedInboxList.map((item, idx) => {
                return (
                    <MessageOverview
                        key={idx}
                        id={item?.author?.id}
                        lastMsg={item?.lastMessage}
                        unsMsg={item.unseenMessages ? item.unseenMessages : 0}
                        time=""
                        username={item?.author?.username}
                        img={item.image}
                    />
                );
            })}
        </div>
    );
}
