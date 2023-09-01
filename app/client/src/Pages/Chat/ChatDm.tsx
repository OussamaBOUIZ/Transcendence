import React, {useEffect, useRef, useContext, useState} from 'react'
import { useParams, Navigate } from 'react-router-dom'
import ChatHeader from './ChatHeader';
import io, {Socket} from 'socket.io-client'
import UserContext from '../../Context/UserContext';
import { InboxItem, MessageData, PlayerData, User } from '../../../../global/Interfaces';
import MessageBox from '../../Components/MessageBox';
import axios from 'axios'
import InboxDm from './InboxDm';
import ContactDetail from './ContactDetail';
import { getUserImage } from '../../Hooks/getUserImage';
import InboxContext from '../../Context/InboxContext';
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';
import { handleReceivedMsg, updateInbox } from '../../Helpers/chatdm.utils';
import useChatOverview from '../../Hooks/useChatOverview';

export default function ChatDm () {
    const {user} = useContext(UserContext)
    const {id} = useParams()
    const {inboxList, setInboxList, setUpdate} = useContext(InboxContext)

    // if (id === undefined) {
    //     return (<Navigate to="/chat/init"/>);
    
    const [userOverview, setUserOverview] = React.useState<PlayerData>({} as PlayerData);
    
    const [socket, setSocket] = useState<Socket | null>(null)
    const [messageToSendValue, setMessageToSendValue] = useState<string>("");
    const [messagesList, setMessagesList] = useState<MessageData[]>([]);
    const [avatar, setAvatar] = useState<string>();

    function handleSubmit (e: React.FormEvent<HTMLElement>) {
        e.preventDefault()
        if (messageToSendValue !== "") {
            const msgToSend: MessageData = {
                receiverId: Number(id),
                authorId: user.id,
                message: messageToSendValue,
                creationTime : new Date().toString()
            }
            setMessageToSendValue("")
            setMessagesList((prevList:MessageData[]) => [...prevList, msgToSend])
            socket?.emit('SendMessage', msgToSend)
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

   const loadAvatar = async (id:string) => {
        try {
            const res = await getUserImage(Number(id));
            setAvatar(res);
        } catch (error) {
            console.error(error);
        }
   }

    /**EFFECTS     */
    useEffectOnUpdate(() => {

        // setUserOverview(useChatOverview(Number(id))); 

        console.log("inboxList", inboxList)
        const value = document.cookie.split('=')[1]
        const newSocket = io('ws://localhost:4000', {
            auth: {
              token: value
            }})
        
        console.log('id has changed: ', id);
        setSocket(newSocket)
        loadConversation();
        loadAvatar(String(id));

        setInboxList((prevInbox:InboxItem[]) => {
            return prevInbox.map((inbx) => {
                console.log('inbox n ', inbx.user.id , 'unseen: ', inbx.unseenMessages, 'my id: ', id)
                return inbx.user.id === Number(id) ? {...inbx, unseenMessages: 0}: inbx
            })
        })

        //cleanup function
        return  () => {
            if (socket)
                socket.disconnect()
        }
    } 
    , [id])

    useEffect(() => {
        socket?.on('message', (recMsg: MessageData) => {
            return handleReceivedMsg(recMsg, setMessagesList, setInboxList, Number(id))
        })
        setUpdate((prevUpdate:number) => prevUpdate + 1);
    }, [socket])

    useEffectOnUpdate(() => {
        updateInbox(setInboxList, messagesList, Number(id))
        setUpdate((prevUpdate:number) => prevUpdate + 1);
    }, [messagesList])
    
    
    const messagesElements = messagesList.map((msg:MessageData) => {
        if (msg.message !== "") {
            return (
                <MessageBox
                // key={msg.creationTime?.getTime()}
                id={msg.authorId === user?.id}>
                {msg.message}
            </MessageBox>
           )
        } 
        return null
    })
    
    return (
        <>
            <InboxDm/>
            <div className="chat_main">
                <ChatHeader
                avatar={userOverview.image}
                username={userOverview.username}
                online={true}
                />

                <section className="chat_window">
                    {messagesElements}               
                </section>

                <form className="chat_input" onSubmit={handleSubmit}>
                    <textarea 
                    placeholder="Type something"
                    onChange={(e) => setMessageToSendValue(e.target.value)}
                    value={messageToSendValue}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
            <ContactDetail oview={userOverview}/>
    </>
    );
}