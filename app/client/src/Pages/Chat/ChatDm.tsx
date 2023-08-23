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

export default function ChatDm () {
    const initialRender = useRef(true)
    const params = useParams()
    const {user} = useContext(UserContext)
    const [socket, setSocket] = React.useState<Socket | null>(null)
    const [messageToSendValue, setMessageToSendValue] = React.useState<string>("");
    const [messageToSendData, setMessageToSendData] = React.useState<MessageData> ({} as MessageData);
    const [receivedMessageData, setReceivedMessageData] = React.useState<MessageData>({} as MessageData);
    const [messagesList, setMessagesList] = React.useState<MessageData[]>([]);

    
    function handleChange (e) :void {
        setMessageToSendValue(e.target.value)
    }

    function handleSubmit (e): void {
        e.preventDefault()
        if (messageToSendValue !== "") {
            setMessageToSendData({
                receiverId: Number(params.id),
                authorId: user.id,
                message: messageToSendValue,
                creationTime : new Date()
            })
            setMessageToSendValue("")
        }
    }
    
    const loadConversation = async ()  => {
        try {
            const res = await axios.get(`../api/chat/${params.id}`)
            console.log(res.data);
            setMessagesList(res.data)
            
        } catch (error) {
            console.log(error);
        }
    }

    console.log("initialrender: ",initialRender.current);
    
    
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

        loadConversation();
        
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
            setMessagesList((prevList) => [...prevList, messageToSendData])
            socket?.emit('SendMessage', messageToSendData)
            console.log('emit message', messageToSendData);
        }
    }
    , [socket, messageToSendData])
    

    useEffect(() => {
        if (initialRender.current) {    
            initialRender.current = false 
            return
        }
        // socket?.on('message', (recMsg: MessageData) => setReceivedMessageData(recMsg))
        // setMessagesList((prevList) => [...prevList, receivedMessageData])
        socket?.on('message', (recMsg: MessageData) => {
            console.log('recMsg: ', recMsg);
            setMessagesList((prevList) => [...prevList, recMsg])
        })
    }, [socket])

    
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        console.log(messagesList)
    }, [messagesList])

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
        {/* <ChatOverview /> */} 
        </>
    );
}