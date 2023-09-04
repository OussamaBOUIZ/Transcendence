import React, {useEffect, useRef, useContext, useState} from 'react'
import { useParams, useLocation } from 'react-router-dom'
import ChatHeader from './ChatHeader';
import UserContext from '../../Context/UserContext';
import { InboxItem, MessageData, PlayerData, User } from '../../../../global/Interfaces';
import MessageBox from '../../Components/MessageBox';
import axios from 'axios'
import InboxDm from './InboxDm';
import ContactDetail from './ContactDetail';
import { getUserImage } from '../../Hooks/getUserImage';
import InboxContext from '../../Context/InboxContext';
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';
import { handleReceivedMsg, updateInbox ,updateInboxBySending ,updateInboxByReceiving, resetUnseenMsgs, updateInboxAtStart} from '../../Helpers/chatdm.utils';
import useChatOverview, { fetchChatOverview } from '../../Hooks/useChatOverview';
import ChatWindow from "./ChatWindow"
import ChatOverview from './ChatOverview';
import {scrollLogic} from "./scrollLogic"
import ChatInput from './chatInput';

export default function ChatDm () {

    
    const {pathname} = useLocation()
    const {user} = useContext(UserContext)
    const {id} = useParams()
    let viewId = Number(id);

    const {inboxList, setInboxList, setUpdate, dmSocket} = useContext(InboxContext)
    const [userOverview, setUserOverview] = React.useState<PlayerData>({} as PlayerData);
    const [messageToSendValue, setMessageToSendValue] = useState<string>("");
    const [messagesList, setMessagesList] = useState<MessageData[]>([]);
    const [avatar, setAvatar] = useState<string>();
    const {outerDiv, innerDiv, prevInnerDivHeight} = useContext(InboxContext)

    function handleSubmit (e: React.FormEvent<HTMLElement>) {
        e.preventDefault()
        if (messageToSendValue.trim() !== "") {
            const sendMsg: MessageData = {
                receiverId: viewId,
                authorId: user.id,
                message: messageToSendValue,
                creationTime : new Date().toString()
            }
            setMessageToSendValue("")
            setMessagesList((prevList:MessageData[]) => {
                return [...prevList, sendMsg]
            })
            dmSocket?.emit('SendMessage', sendMsg)
            updateInboxBySending(sendMsg, setInboxList, userOverview.image, userOverview.username);
        }
    }
    
    
    const loadConversation = async ()  => {
        try {
            const res = await axios.get(`../api/chat/${id}`)
            setMessagesList(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    /**EFFECTS     */
    useEffectOnUpdate(() => {

        if (id === undefined) {
            return ;
        }
        fetchChatOverview(viewId, setUserOverview)
        loadConversation();
        resetUnseenMsgs(setInboxList, viewId);
        // updateInboxAtStart(setInboxList, messagesList[messagesList.length - 1], viewId)
    }
    , [viewId])

    console.log("id: ", id);

    useEffectOnUpdate(() => {
        dmSocket?.on('message', (recMsg: MessageData) => {
            const inView:boolean =  recMsg.authorId ===  Number(id);
            updateInboxByReceiving(recMsg, setInboxList, inView);
        })
    }, [dmSocket, id])

    useEffectOnUpdate(() => {
        dmSocket?.on('message', (recMsg: MessageData) => {
            if (recMsg.authorId === viewId)
                setMessagesList((prevMsgs) => [...prevMsgs, recMsg])
            // console.log("Number(id)", Number(id))
            // console.log("recMsg.authorId", recMsg.authorId)
            // const inView:boolean =  recMsg.authorId ===  Number(id);
            // console.log("inView", inView)
            // updateInboxByReceiving(recMsg, setInboxList, inView);
            // console.log("inboxList : ", inboxList)
        })
    }, [ dmSocket])

    useEffectOnUpdate(() => {
        scrollLogic(outerDiv, innerDiv, prevInnerDivHeight);
    }, [messagesList])

    useEffectOnUpdate(scrollLogic(outerDiv, innerDiv, prevInnerDivHeight), [messagesList])

    const messagesElements = messagesList.map((msg:MessageData) => {
        if (msg.message !== "") {
            return (
                <MessageBox
                // key={msg.creationTime?.getTime()}
                id={msg.authorId !== user?.id}
                >
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