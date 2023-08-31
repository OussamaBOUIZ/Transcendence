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
        <section className="online_now overflow-x-hidden">
            <h3>Online now</h3>
            <div className="content overflow-y-scroll gap-4 flex ">
                {
                    inboxList.length === 0 
                    ?
                    <p>Here's where your online friend will light up</p>
                    :
                    onlineElements
                }
                
            </div>
        </section>
    );
}