import React, {createContext, useEffect, useState} from 'react'
import { InboxItem } from '../../../global/Interfaces';
import axios, {AxiosResponse} from 'axios'
import data from "../api/inbox.json"

interface InboxContextType {
    inboxList: InboxItem[];
    setInboxList:React.Dispatch<React.SetStateAction<InboxItem[]>>;
    update: number; 
    setUpdate: React.Dispatch<React.SetStateAction<number>>;
}

const InboxContext = createContext<InboxContextType>({} as InboxContextType);
export function InboxProvider ({children}: {children:React.ReactNode}) {

    const [inboxList, setInboxList] = useState<InboxItem[]>([]);
    const [update, setUpdate] = useState<number>(0);

    const fetchInbox = async () => {
        try {
            const res: AxiosResponse<InboxItem[]> = await axios.get('../api/inbox/all');
            if (res.data.length !== 0)
                setInboxList(res.data)
            } catch (error) {
                console.error();
        }
    }
    
    useEffect(() => {
        fetchInbox()
    },[])

    return (
        <InboxContext.Provider value={{
            inboxList,setInboxList,
            update, setUpdate
        }}>
        {children}
        </InboxContext.Provider>
    )
}

export default InboxContext;