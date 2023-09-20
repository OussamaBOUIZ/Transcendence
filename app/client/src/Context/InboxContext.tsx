import React, {createContext, useState, useRef} from 'react'
import { InboxItem, MessageData } from '../../global/Interfaces';
import axios from 'axios'
import { getUserImage } from '../Hooks/getUserImage';
import io, {Socket} from 'socket.io-client'
import useEffectOnUpdate from '../Hooks/useEffectOnUpdate';
import {updateInboxByReceiving} from "../Helpers/chatdm.utils"


interface InboxContextType {
    inboxList: React.MutableRefObject<InboxItem[]>;
    update: number; 
    setUpdate: React.Dispatch<React.SetStateAction<number>>;
    isBanned: boolean;
    setBanned: React.Dispatch<React.SetStateAction<boolean>>;
    viewIdRef: React.MutableRefObject<number>,
    messagesList: MessageData[],
    setMessagesList: React.Dispatch<React.SetStateAction<MessageData[]>>
    outerDiv: React.RefObject<HTMLDivElement>;
    innerDiv: React.RefObject<HTMLDivElement>;
    prevInnerDivHeight: React.MutableRefObject<number>;
    dmSocket: Socket | undefined;
    setDmSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>;
}

const InboxContext = createContext<InboxContextType>({} as InboxContextType);

export function InboxProvider ({children}: {children:React.ReactNode}) {
    
    const [dmSocket, setDmSocket] = useState<Socket>();
    const viewIdRef = useRef<number>(0);
    const [messagesList, setMessagesList] = useState<MessageData[]>([]);
    const inboxList = useRef<InboxItem[]>([]);
    const [update, setUpdate] = useState<number>(0);
    const outerDiv = useRef<HTMLDivElement>(null);
    const innerDiv = useRef<HTMLDivElement>(null);
    const [isBanned, setBanned] = useState<boolean>(false)
    const prevInnerDivHeight = useRef<number>(0);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const mapInbxImg = async (item:InboxItem) => {
        const image = await getUserImage(item.author.id) 
        return {...item, image}
    }
    const fetchInboxAvatars = async (inboxArr : InboxItem[]) => {
       return Promise.all<InboxItem>(
            inboxArr.map(mapInbxImg)
        )
    }

    const fetchInbox = async () => {
        try {
            const res = await axios.get<InboxItem[]>('/api/inbox/all');
            console.log(res.data);
            if (res.data.length !== 0) 
            {
                const newData = await fetchInboxAvatars(res.data)
                inboxList.current = newData;
                setIsLoaded(true);
            }
            } catch (error) {
                console.error();
        }
    }
    
    useEffectOnUpdate(() => {fetchInbox()}, [isLoaded])

    useEffectOnUpdate(() => {
        //init socket
        const value = document.cookie.split('=')[1]
        const newSocket = io('ws://localhost:4000', {
            auth: {
                token: value
            }})
            setDmSocket(newSocket)
        return () => {
            newSocket.disconnect()
        }
    }, [])

    useEffectOnUpdate(() => {
        dmSocket?.on('message', (recMsg: MessageData) => {
            console.log('new message')
            const inView: boolean = recMsg.authorId === viewIdRef.current;
            if (inView)
                setMessagesList((prevMsgs) => [...prevMsgs, recMsg]);
            const fetch =async () => {
                try {
                    const newInboxList = await updateInboxByReceiving(dmSocket, recMsg, inboxList, inView);
                    inboxList.current = newInboxList;
                    setUpdate(prev => prev + 1)
                }
                catch (error) {
                    // console.log(error);
                }
            }
            void fetch();
        });
    }, [dmSocket]);

    return (
        <InboxContext.Provider value={{
            outerDiv, innerDiv,
            isBanned, setBanned,
            prevInnerDivHeight,
            inboxList, viewIdRef,
            messagesList, setMessagesList,
            update, setUpdate,
            dmSocket, setDmSocket,
        }}>
        {children}
        </InboxContext.Provider>
    )
}

export default InboxContext;