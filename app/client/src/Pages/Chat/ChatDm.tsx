import React, {useContext, useState} from 'react'
import { useParams } from 'react-router-dom'
import ChatHeader from './ChatHeader';
import UserContext from '../../Context/UserContext';
import { MessageData, PlayerData } from '../../../../global/Interfaces';
import MessageBox from '../../Components/MessageBox';
import axios from 'axios'
import InboxDm from './InboxDm';
import InboxContext from '../../Context/InboxContext';
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';
import { updateInboxBySending, resetUnseenMsgs} from '../../Helpers/chatdm.utils';
import { fetchChatOverview } from '../../Hooks/useChatOverview';
import ChatWindow from "./ChatWindow"
import ChatOverview from './ChatOverview';
import {scrollLogic} from "./scrollLogic"
import ChatInput from './chatInput';

export default function ChatDm () {

    const {user} = useContext(UserContext)
    const { id } = useParams();
    const {inboxList, setUpdate, dmSocket} = useContext(InboxContext)
    const [userOverview, setUserOverview] = React.useState<PlayerData>({} as PlayerData);
    const [messageToSendValue, setMessageToSendValue] = useState<string>("");
    const {outerDiv, innerDiv, prevInnerDivHeight, viewIdRef, messagesList, setMessagesList} = useContext(InboxContext)

    const messagesElements = messagesList.map((msg) => {
        if (msg.message !== "") {
            return (
                <MessageBox
                id={msg.authorId !== user?.id}
                >
                {msg.message}
            </MessageBox>
           )
        } 
        return null
    })

    function handleSubmit (e: React.FormEvent<HTMLElement>) {
        e.preventDefault()
        if (messageToSendValue.trim() !== "") {
            const sendMsg: MessageData = {
                receiverId: viewIdRef.current,
                authorId: user.id,
                username: user.username,
                message: messageToSendValue,
                creationTime : new Date().toString()
            }
            setMessageToSendValue("")
            setMessagesList((prevList) => {
                return [...prevList, sendMsg]
            })
            setUpdate(prev => prev + 1)
            dmSocket?.emit('SendMessage', sendMsg)
            updateInboxBySending(sendMsg, inboxList, userOverview.image, userOverview.username);
        }
    }
    
    
    const loadConversation = async ()  => {
        try {
            const res = await axios.get(`/api/chat/${id}`)
            setMessagesList(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffectOnUpdate(() => {
        viewIdRef.current = Number(id)
        if (id !== undefined) {
            fetchChatOverview(Number(id), setUserOverview)
            loadConversation();
            resetUnseenMsgs(dmSocket, inboxList, setUpdate, Number(id));
        }
    }
    , [id])

    useEffectOnUpdate(() => {
        scrollLogic(outerDiv, innerDiv, prevInnerDivHeight);
    }, [messagesList])

    useEffectOnUpdate(scrollLogic(outerDiv, innerDiv, prevInnerDivHeight), [messagesList])
    
    return (
        <>
            <InboxDm/>
            <div className="chat_main">
                <ChatHeader
                id={id}
                avatar={userOverview.image}
                username={userOverview.username}
                online={true}
                />

                <ChatWindow id={id}>
                    {messagesElements}
                </ChatWindow>

                <ChatInput 
                message={messageToSendValue} 
                setMessage={setMessageToSendValue} 
                sender={handleSubmit} 
                id={id} 
                />
            </div>
            {/* <ContactDetail oview={userOverview} id={(String(id))}/> */}
            <ChatOverview oview={userOverview} id={id}/>
    </>
    );
}