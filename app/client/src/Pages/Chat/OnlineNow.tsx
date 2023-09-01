import React, { useContext } from 'react'
import { InboxItem } from '../../../../global/Interfaces';
import Avatar from '../../Components/Avatar';
import InboxContext from '../../Context/InboxContext';

interface PropType {
    image: string;
}

export default function OnlineNow ({} :PropType) {
    const {inboxList} = useContext(InboxContext);

    const onlineElements = inboxList.filter((item:InboxItem) => (item.online === true)).map((item:InboxItem) => {
        return (
                <Avatar profileId={item.id ?? 0} imgSource={item.image}/>
        )
    })

    return (
        <section className="online_now">
            <h3>Online now</h3>
            <div className="flex p-4 overflow-hidden">
                {
                    inboxList.length === 0 
                    ?
                    <p>Here's where your online friend will light up</p>
                    :
                    <div className='flex overflow-x-auto gap-x-2'>{onlineElements}</div>
                }
                
            </div>
        </section>
    );
}