import React, {createContext, useEffect, useState, useRef, useContext} from 'react'
import { InboxItem, MessageData } from '../../../global/Interfaces';
import axios, {AxiosResponse} from 'axios'
import data from "../api/inbox.json"
import { getUserImage } from '../Hooks/getUserImage';
import io, {Socket} from 'socket.io-client'
import useEffectOnUpdate from '../Hooks/useEffectOnUpdate';
import UserContext from './UserContext';


interface InboxContextType {
    inboxList: InboxItem[];
    setInboxList:React.Dispatch<React.SetStateAction<InboxItem[]>>;
    update: number; 
    setUpdate: React.Dispatch<React.SetStateAction<number>>;
    isBanned: boolean;
    setBanned: React.Dispatch<React.SetStateAction<boolean>>;
    outerDiv: React.RefObject<HTMLDivElement>;
    innerDiv: React.RefObject<HTMLDivElement>;
    prevInnerDivHeight: React.MutableRefObject<number>;
    dmSocket: Socket | null;
    setDmSocket: React.Dispatch<React.SetStateAction<Socket | null>>
}

const InboxContext = createContext<InboxContextType>({} as InboxContextType);

export function InboxProvider ({children}: {children:React.ReactNode}) {
    console.log('inbox provider rendered');
    
    const [dmSocket, setDmSocket] = useState<Socket | null>(null);

    const [inboxList, setInboxList] = useState<InboxItem[]>([]);
    const [update, setUpdate] = useState<number>(0);
    const outerDiv = useRef<HTMLDivElement>(null);
    const innerDiv = useRef<HTMLDivElement>(null);
    const [isBanned, setBanned] = useState<boolean>(false)
    const prevInnerDivHeight = useRef<number>(0);

    const {user} = useContext(UserContext)
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
            const res: AxiosResponse<InboxItem[]> = await axios.get('../api/inbox/all');
            if (res.data.length !== 0) {
                const newData = await fetchInboxAvatars(res.data)
                setInboxList(newData)
            }
            } catch (error) {
                console.error();
        }
    }
    
    useEffectOnUpdate(() => {
        fetchInbox()
        console.log('socket initizlia');
        
        //init socket
        const value = document.cookie.split('=')[1]
        const newSocket = io('ws://localhost:4000', {
            auth: {
                token: value
            }})
            setDmSocket(newSocket)
            return () => {
                if (dmSocket)
                dmSocket.disconnect()
        }
    },[])

    return (
        <InboxContext.Provider value={{
            outerDiv, innerDiv,
            isBanned, setBanned,
            prevInnerDivHeight,
            inboxList,setInboxList,
            update, setUpdate,
            dmSocket, setDmSocket
        }}>
        {children}
        </InboxContext.Provider>
    )
}

export default InboxContext;