import React, {createContext, useEffect, useState} from 'react'
import { InboxItem } from '../../../global/Interfaces';
const InboxContext = createContext({});
import axios, {AxiosResponse} from 'axios'

export function InboxProvider ({children}: {children:React.ReactNode}) {

    const [inboxList, setInboxList] = useState<InboxItem[]>([]);
    const [update, setUpdate] = useState<number>(0);

    const fetchInbox = async () => {
        try {
            const res: AxiosResponse<InboxItem[]> = await axios.get('../api/inbox/all');
            console.log('fetched inbox : ',res.data.length);
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