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
    const [receivedMessage, setReceivedMessage] = React.useState<string>("");

    const [messages, setMessages] = React.useState<string[]>([]);
    
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
        e.preventDefault()
        if (messageToSendValue !== "") {
            setMessageToSendData({
                userId: Number(params.id),
                message: messageToSendValue,
                creationTime : new Date()
            })
            setMessageToSendValue("")
        }
    }
    
    /**EFFECTS     */
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        const value = document.cookie.split('=')[1]
        // console.log(value);
        
        const newSocket = io('ws://localhost:4000', {
            auth: {
              token: value
            }}) 
        
        setSocket(newSocket)
        
        //cleanup function
        return  () => {
            if (socket)
                socket.disconnect();
        }
    } 
    , []) 

    
    useEffect(() => {
        if (initialRender.current) {    
            initialRender.current = false 
            return
        }
        socket?.emit('SendMessage', messageToSendData)
        setMessages((prevMessages:string[]) => [...prevMessages, messageToSendData.message])
    }
    , [messageToSendData])
    

    useEffect(() => {
        socket?.on('message', (mess: string) => setReceivedMessage(mess))
        if (receivedMessage !== "") {
        setMessages((prevMessages:string[]) => [...prevMessages, receivedMessage])
        console.log('Received: ', receivedMessage)
        }

    }, [socket, receivedMessage])

    
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        console.log(messages)
    }, [messages])


    const messStyle = {
        textAlign: 'center',
        fontSize: '1em',
        margin: '.5em',
    }
    const messagesElements = messages.map((item:string) => <h2 style={messStyle}>{item}</h2>)
    return (
        <>  
        <div className="chat_main">
             <ChatHeader 
             username={`user id: ${params.id}`}
             online={true}
             />

             <section className="chat_window">
                {messagesElements}               
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