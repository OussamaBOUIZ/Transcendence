import React, {useEffect, useRef, useContext} from 'react'
import { useParams } from 'react-router-dom'
import ChatHeader from './ChatHeader';
import ChatOverview from './ChatOverview';
import io, {Socket} from 'socket.io-client'
import UserContext from '../../Context/UserContext';
import { PlayerData, MessageData } from '../../../../global/Interfaces';
import MessageBox from '../../Components/MessageBox';
import axios from 'axios'
import InboxDm from './InboxDm';
import ChatDmInit from './ChatDmInit';

export default function ChatDm () {
    const initialRender = useRef(true)
    const {id} = useParams()
    const {user} = useContext(UserContext)
    const [socket, setSocket] = React.useState<Socket | null>(null)
    const [messageToSendValue, setMessageToSendValue] = React.useState<string>("");
    const [messageToSendData, setMessageToSendData] = React.useState<MessageData> ({} as MessageData);
    const [receivedMessageData, setReceivedMessageData] = React.useState<MessageData>({} as MessageData);
    const [messagesList, setMessagesList] = React.useState<MessageData[]>([]);

    
    function handleChange (e: React.ChangeEvent<HTMLElement> ) :void {
        setMessageToSendValue(e.target.value)
    }

    function handleSubmit (e:  React.FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        if (messageToSendValue !== "") {
            setMessageToSendData({
                receiverId: Number(id),
                message: messageToSendValue,
                creationTime : new Date()
            })
            setMessageToSendValue("")
            console.log(messageToSendData);
            
        }
    }
    
    const loadConversation = async ()  => {
        try {
            const res = await axios.get(`../api/chat/${id}`)
            console.log('res data', res.data);
            
            setMessagesList(res.data)
            
        } catch (error) {
            console.log(error);
        }
    }


    
    /**EFFECTS     */
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        const value = document.cookie.split('=')[1]
        const newSocket = io('ws://localhost:4000', {
            auth: {
              token: value
            }}) 
        
        setSocket(newSocket)

        // Getting the conversation 
        loadConversation();
        // getUserOverview();

        
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
        if (messageToSendData.message !== "") {
            socket?.emit('SendMessage', messageToSendData)
            setMessagesList((prevList) => [...prevList, {...messageToSendData, authorId: Number(id)}])
            console.log('emit message', messageToSendData);
        }
        
    }
    , [socket, messageToSendData])
    

    useEffect(() => {
        if (initialRender.current) {    
            initialRender.current = false 
            return
        }
        
        socket?.on('message', (recMsg: MessageData) => setReceivedMessageData(recMsg))
        // console.log('on message', receivedMessageData);
        
        setMessagesList((prevList) => [...prevList, receivedMessageData])

    }, [socket, receivedMessageData])

    
    // useEffect(() => {
    //     if (initialRender.current) {
    //         initialRender.current = false
    //         return
    //     }
    //     console.log(messagesList)
    // }, [messagesList])

    const messagesElements = messagesList.map((msg:MessageData) => {
        console.log(msg.authorId);
        
        if (msg.message !== "") {
            return (
                <MessageBox
                    id={msg.authorId === user?.id}>
                    {msg.message}
                </MessageBox>
           )
        } 
        return null
    })
    
    
    return (
        <>
        <InboxDm />
        <div className="chat_main">
            <ChatHeader 
             username={`user id: ${id}`}
             online={true}
             />

             <section className="chat_window bg-chat-body">
                {id && messagesElements}
                {!id && <ChatDmInit />}           
             </section>


             <form className="chat_input" onSubmit={handleSubmit}>
                <textarea 
                placeholder="Type something"
                onChange={handleChange}
                value={messageToSendValue}
                />
                <button className='bg-primary-pink' type="submit">Send</button>
            </form>
        </div>
        <ChatOverview />
        </>
    );
}