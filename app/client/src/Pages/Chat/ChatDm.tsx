import React from 'react'
import { useParams } from 'react-router-dom'
import ChatHeader from './ChatHeader';
import ChatOverview from './ChatOverview';
import { User, MessageData } from '../../../../global/Interfaces';

export default function ChatDm () {
    const params = useParams()
    const [receiver, setReceiver] = React.useState<User | null>(null);
    const [receivedMessage, setReceivedMessage] = React.useState<MessageData | null>(null);
    const [messageToSend, setMessageToSend] = React.useState<MessageData | null> (null);
    
    return (
        <>
        <div className="chat_main">
             <ChatHeader 
             username={`user id: ${params.id}`}
             online={true}
             />

             <section className="chat_window">
                
            </section>


             <form className="chat_input" onSubmit={() => console.log("On submit")}>
                <textarea 
                placeholder="Type something"
                onChange={() => console.log('on change')}
                />
                <button type="submit">Send</button>
            </form>
        </div>
        <ChatOverview />
        </>
    );
}