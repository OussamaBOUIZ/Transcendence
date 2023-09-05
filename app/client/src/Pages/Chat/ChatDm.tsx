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
import { listener } from './listener';
import {observer} from "./observer"

export default function ChatDm () {

    const {pathname} = useLocation()
    const {user} = useContext(UserContext)
    const {id} = useParams()
    console.log(id)
    let viewId = Number(id);
    const {inboxList, setInboxList, setUpdate, dmSocket} = useContext(InboxContext)
    const [userOverview, setUserOverview] = React.useState<PlayerData>({} as PlayerData);
    const [messageToSendValue, setMessageToSendValue] = useState<string>("");
    const [messagesList, setMessagesList] = useState<MessageData[]>([]);
    const [avatar, setAvatar] = useState<string>();
    const {outerDiv, innerDiv, prevInnerDivHeight} = useContext(InboxContext)

    const messagesElements = messagesList.map((msg) => {
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

    function handleSubmit (e: React.FormEvent<HTMLElement>) {
        e.preventDefault()
        if (messageToSendValue.trim() !== "") {
            const sendMsg: MessageData = {
                receiverId: viewId,
                authorId: user.id,
                username: user.username,
                message: messageToSendValue,
                creationTime : new Date().toString()
            }
            setMessageToSendValue("")
            setMessagesList((prevList) => {
                return [...prevList, sendMsg]
            })
            dmSocket?.emit('SendMessage', sendMsg)
            updateInboxBySending(sendMsg, setInboxList, userOverview.image, userOverview.username);
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

    /**EFFECTS     */
    useEffectOnUpdate(() => {

        if (id === undefined) {
            return ;
        }
        fetchChatOverview(viewId, setUserOverview)
        loadConversation();
        resetUnseenMsgs(setInboxList, setUpdate, viewId);
        // updateInboxAtStart(setInboxList, messagesList[messagesList.length - 1], viewId)
    }
    , [viewId])

    useEffectOnUpdate(() => {
        dmSocket?.on('message', (recMsg: MessageData) => {
            console.log(inboxList);
            const inView: boolean = recMsg.authorId === viewId;
            console.log(inView)
            if (recMsg.authorId === viewId)
                setMessagesList((prevMsgs) => [...prevMsgs, recMsg]);
            // let newInboxList: InboxItem[]
            const fetch =async () => {
                try {
                    // newInboxList = updateInboxByReceiving(recMsg, inboxList, inView);
                    setInboxList(prev => updateInboxByReceiving(recMsg, prev, inView));
                }
                catch (error) {
                    // console.log(error);
                }
            }
            void fetch();
        });
    }, [dmSocket]);

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