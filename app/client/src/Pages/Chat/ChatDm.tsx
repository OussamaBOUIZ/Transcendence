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
    // const [userOverview, setUserOverview] = React.useState<PlayerData>({} as PlayerData);

    
    function handleChange (e: React.ChangeEvent<HTMLElement> ) :void {
        setMessageToSendValue(e.target.value)
    }

    function handleSubmit (e:  React.FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        if (messageToSendValue !== "") {
            setMessageToSendData({
                receiverId: Number(params.id),
                message: messageToSendValue,
                creationTime : new Date()
            })
            setMessageToSendValue("")
        }
    }
    
    const loadConversation = async ()  => {
        try {
            const res = await axios.get(`../api/chat/${params.id}`)
            setMessagesList(res.data)
            
        } catch (error) {
            console.log(error);
        }
    }

    // const getUserOverview = async () => {
    //     try {
    //         const res = await axios.get(`../api/user/user/details/${params.id}`)
    //         setUserOverview(res.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    
    /**EFFECTS     */
    useEffect(() => {
        // if (initialRender.current) {
        //     initialRender.current = false
        //     return
        // }
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
        socket?.emit('SendMessage', messageToSendData)
        console.log('emit message', messageToSendData);
        
        setMessagesList((prevList) => [...prevList, messageToSendData])
    }
    , [socket, messageToSendData])
    

    useEffect(() => {
        console.log('aaaaaaaaa');
        
        socket?.on('message', (recMsg: MessageData) => setReceivedMessageData(recMsg))
        console.log('on message', receivedMessageData);
        
        setMessagesList((prevList) => [...prevList, receivedMessageData])

    }, [socket, receivedMessageData])

    
    // useEffect(() => {
    //     if (initialRender.current) {
    //         initialRender.current = false
    //         return
    //     }
    //     console.log(messagesList)
    // }, [messagesList])

    const messagesElements = messagesList.map((recMsg:MessageData) => {
        return (
            <MessageBox
            id={recMsg.authorId === user?.id}>
            {recMsg.message}
            </MessageBox>
        )
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
        <ChatOverview />
        </>
    );
}