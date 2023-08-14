import React from 'react'
import { useParams } from 'react-router-dom'
import ChatHeader from './ChatHeader';
import ChatOverview from './ChatOverview';

export default function ChatDm () {
    const params = useParams()

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