import React, {useContext, useEffect, useState} from 'react'
import MessageOverview from './MessageOverview';
import { InboxItem } from '../../../../global/Interfaces';

export default function InboxDm ({inbox}: {inbox:InboxItem[]}) {

    return (
        <div className="chat_inbox">
            {inbox?.map((item:InboxItem) => {
                return (
                <MessageOverview 
                    key={item?.id}
                    id={item?.id}
                    lastMsg={item?.lastMessage}
                    unsMsg={item?.unseenMessage ? item?.unseenMessage: 0}
                    />)
            })}
        </div>
    );
}