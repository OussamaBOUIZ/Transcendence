import React, {useEffect, useRef, useContext, useState} from 'react'
import { useParams } from 'react-router-dom'
import ChatHeader from './ChatHeader';
import io, {Socket} from 'socket.io-client'
import UserContext from '../../Context/UserContext';
import { InboxItem, MessageData, User } from '../../../../global/Interfaces';
import MessageBox from '../../Components/MessageBox';
import axios from 'axios'
import InboxDm from './InboxDm';
import ContactDetail from './ContactDetail';
import { getUserImage } from '../../Hooks/getUserImage';
import ChatVoid from './ChatVoid';
import InboxContext from '../../Context/InboxContext';
import { shortenMessage } from '../../Helpers/utils';
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';

export default function ChatDm () {
    const {user} = useContext(UserContext)
    const initialRender = useRef(true)
    const params = useParams()
    const {inboxList, setInboxList} = useContext(InboxContext)

    if (params.id === undefined) {
        return (
        <>
            <InboxDm />
            <ChatVoid />
        </>
        );
    }
    
    
    const [socket, setSocket] = useState<Socket | null>(null)
    const [messageToSendValue, setMessageToSendValue] = useState<string>("");
    const [messageToSendData, setMessageToSendData] = useState<MessageData> ({} as MessageData);
    const [messagesList, setMessagesList] = useState<MessageData[]>([]);
    const [avatar, setAvatar] = useState();

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
        loadAvatar(params.id);
        
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
            setMessagesList((prevList:MessageData[]) => [...prevList, messageToSendData])
            socket?.emit('SendMessage', messageToSendData)
        }
    }
    , [socket, messageToSendData])
    

    useEffect(() => {
        if (initialRender.current) {    
            initialRender.current = false 
            return
        }
        socket?.on('message', (recMsg: MessageData) => {
            if (recMsg?.authorId === Number(params.id))
                setMessagesList((prevList:MessageData[]) => [...prevList, recMsg])
            else
                console.log('Update Inbox');
        })
    }, [socket])

    useEffectOnUpdate(() => {
        setInboxList((prevList:InboxItem[]) => {
            if (prevList?.length) {
                prevList.map((item:InboxItem) => {
                    return (
                        item.id ===  Number(params.id) ?
                        item.lastMessage = shortenMessage(messagesList[messagesList.length - 1].message):
                        item
                        )
                    })
            } else {
              return  messagesList?.length ? [{
                    id: Number(params.id),
                    lastMessage: shortenMessage(messagesList[messagesList.length - 1].message),
                }] : [];
            }
        })
    }, [messagesList])


    
    const messagesElements = messagesList.map((msg:MessageData) => {
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
                avatar={avatar}
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
            <ContactDetail id={params.id} avatar={avatar}/>
    </>
    );
}