import React, {useEffect, useRef, useContext} from 'react'
import { useParams } from 'react-router-dom'
import ChatHeader from './ChatHeader';
import ChatOverview from './ChatOverview';
import io, {Socket} from 'socket.io-client'
import UserContext from '../../Context/UserContext';
import { User, MessageData } from '../../../../global/Interfaces';
import MessageBox from '../../Components/MessageBox';
import axios from 'axios'

// const messagesList = [
//     {id: 1, message: "hello ossama", date: new Date()},
//     {id: 2, message: "hello yassinehello yassinehello yassinehello yassinehello yasshello yassinehello yassinehello yassineine", date: new Date()},
//     {id: 1, message: "hello yassinehello yassinehello yassinehello yassinehello yasshello yassinehello yassinehello yassineine", date: new Date()},
//     {id: 1, message: "lhamdulilah nta bikhir", date: new Date()},
//     {id: 2, message: "Axkat3awd", date: new Date()},
//     {id: 1, message: "bikhir gulia t7rk maana l cafet", date: new Date()},
//     {id: 2, message: "ana tma ntla9aw ra gltha l3aziz", date: new Date()},
//     {id: 2, message: "ana tma ntla9aw ra gltha l3aziz", date: new Date()},
//     {id: 1, message: "lhamdulilah nta bikhir", date: new Date()},
//     {id: 2, message: "Axkat3awd", date: new Date()},
//     {id: 1, message: "bikhir gulia t7rk maana l cafet", date: new Date()},
//     {id: 1, message: "bikhir gulia t7rk maana l cafet", date: new Date()},
//     {id: 2, message: "ana tma ntla9aw ra gltha l3aziz", date: new Date()},
//     {id: 1, message: "lhamdulilah nta bikhir", date: new Date()},
//     {id: 2, message: "Axkat3awd", date: new Date()},
//     {id: 1, message: "bikhir gulia t7rk maana l cafet", date: new Date()},
//     {id: 2, message: "ana tma ntla9aw ra gltha l3aziz", date: new Date()},
//     // {id: 1, message: "hello ossama", date: new Date()},
//     // {id: 2, message: "hello yassine", date: new Date()}
// ]

export default function ChatDm () {
    const initialRender = useRef(true)
    const params = useParams()
    const {user} = useContext(UserContext)
    const [socket, setSocket] = React.useState<Socket | null>(null)
    const [messageToSendValue, setMessageToSendValue] = React.useState<string>("");
    const [messageToSendData, setMessageToSendData] = React.useState<MessageData> ({} as MessageData);
    const [receivedMessageData, setReceivedMessageData] = React.useState<MessageData>({} as MessageData);
    const [messagesList, setMessagesList] = React.useState<MessageData[]>([]);
    


    // const [messageToSendData, setMessageToSendData] = React.useState<MessageData> ({
    //     authorId: Number(params.id),
    //     message: "",
    //     creationTime : new Date()
    // });
    
    function handleChange (e: React.ChangeEvent<HTMLElement> ) :void {
        setMessageToSendValue(e.target.value)
    }

    function handleSubmit (e:  React.FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        if (messageToSendValue !== "") {
            setMessageToSendData({
                authorId: Number(params.id),
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
            console.log(messagesList);
            
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
        setMessagesList((prevList) => [...prevList, messageToSendData])
    }
    , [messageToSendData])
    

    useEffect(() => {
        socket?.on('message', (mess: string) => setReceivedMessageData({authorId: 2, message: mess, creationTime: new Date()}))
        if (receivedMessageData.message !== "") {
            setMessagesList((prevList) => [...prevList, receivedMessageData])
            console.log('Received: ', receivedMessageData.message)
        }

    }, [socket, receivedMessageData])

    
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        console.log(messagesList)
    }, [messagesList])

    const messagesElements = messagesList.map((mess:MessageData) => {
        console.log('mess.id : ', mess.authorId);
        
        return (
            <MessageBox
            id={mess.authorId === user?.id}>
            {mess.message}
            </MessageBox>
        )
    })
    

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