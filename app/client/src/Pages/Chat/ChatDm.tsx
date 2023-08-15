import React, {useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom'
import ChatHeader from './ChatHeader';
import ChatOverview from './ChatOverview';
import io, {Socket} from 'socket.io-client'

import { User, MessageData } from '../../../../global/Interfaces';

export default function ChatDm () {
    const initialRender = useRef(true)
    const params = useParams()
    const [socket, setSocket] = React.useState<Socket | null>(null)
    const [receiver, setReceiver] = React.useState<User | null>(null);
    const [receivedMessage, setReceivedMessage] = React.useState<MessageData | null>(null);
    
    const [messageToSendValue, setMessageToSendValue] = React.useState<string>("");
    const [messageToSendData, setMessageToSendData] = React.useState<MessageData> ({
        userId: Number(params.id),
        message: "",
        creationTime : new Date()
    });
    
    function handleChange (e) :void {
        setMessageToSendValue(e.target.value)
    }

   
       

      
    function handleSubmit (e): void {
        console.log('hello');
        
        e.preventDefault()
        if (messageToSendValue !== "") {
            console.log('message 1', messageToSendValue);
            
            setMessageToSendData({
                userId: Number(params.id),
                message: messageToSendValue,
                creationTime : new Date()
            })
            // console.log(messageToSendData)

        }

    }
    console.log(messageToSendData)

    
    /**EFFECTS     */
    // useEffect(() => {
    //     if (initialRender.current) {
    //         initialRender.current = false
    //         return
    //     }
    //     const newSocket = io('ws://localhost:4000') 
    //     setSocket(newSocket)

    //     return  () => {
    //         if (socket)
    //             socket.disconnect();
    //     }
    // }
    // , [])

    
    // useEffect(() => {
    //     if (initialRender.current) {
    //         initialRender.current = false
    //         return
    //     }
    //     socket?.emit('SendMessage', messageToSendData)    
    // }
    // , [messageToSendData])
    

    // useEffect(() => {
    //     if (initialRender.current) {
    //         initialRender.current = false
    //         return
    //     }
    //     socket?.on('message', () => console.log('A message were sent'))
    // }, [])

    return (
        <>
        <div className="chat_main">
             <ChatHeader 
             username={`user id: ${params.id}`}
             online={true}
             />

             <section className="chat_window">
                
            </section>


             <form className="chat_input" onSubmit={handleSubmit}>
                <textarea 
                placeholder="Type something"
                onChange={handleChange}
                value={messageToSendValue}
                />
                <button type="submit">Send</button>
            </form>
        </div>
        <ChatOverview />
        </>
    );
}