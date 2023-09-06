import React, {createContext, useEffect, useState, useRef, useContext} from 'react'
import { InboxItem, MessageData } from '../../../global/Interfaces';
import axios, {AxiosResponse} from 'axios'
import { getUserImage } from '../Hooks/getUserImage';
import io, {Socket} from 'socket.io-client'
import useEffectOnUpdate from '../Hooks/useEffectOnUpdate';


interface InboxContextType {
    inboxList: React.MutableRefObject<InboxItem[]>;
    update: number; 
    setUpdate: React.Dispatch<React.SetStateAction<number>>;
    isBanned: boolean;
    setBanned: React.Dispatch<React.SetStateAction<boolean>>;
    outerDiv: React.RefObject<HTMLDivElement>;
    innerDiv: React.RefObject<HTMLDivElement>;
    prevInnerDivHeight: React.MutableRefObject<number>;
    dmSocket: Socket | undefined;
    setDmSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>
}

const InboxContext = createContext<InboxContextType>({} as InboxContextType);

export function InboxProvider ({children}: {children:React.ReactNode}) {
    
    const [dmSocket, setDmSocket] = useState<Socket>();

    const inboxList = useRef<InboxItem[]>([]);
    const [update, setUpdate] = useState<number>(0);
    const outerDiv = useRef<HTMLDivElement>(null);
    const innerDiv = useRef<HTMLDivElement>(null);
    const [isBanned, setBanned] = useState<boolean>(false)
    const prevInnerDivHeight = useRef<number>(0);
    const [isLoaded, setIsLoaded] = useState<Boolean>(false);

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
    
    useEffectOnUpdate(() => {
        console.log("hello captain");
        
        fetchInbox()
    }, [isLoaded])

    useEffectOnUpdate(() => {
        //init socket
        console.log('init socket');
        
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

    return (
        <InboxContext.Provider value={{
            outerDiv, innerDiv,
            isBanned, setBanned,
            prevInnerDivHeight,
            inboxList,
            update, setUpdate,
            dmSocket, setDmSocket
        }}>
        {children}
        </InboxContext.Provider>
    )
}

export default InboxContext;