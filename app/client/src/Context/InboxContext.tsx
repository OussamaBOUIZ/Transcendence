import React, {createContext, useEffect, useState} from 'react'
import { InboxItem } from '../../../global/Interfaces';
const InboxContext = createContext({});
import axios, {AxiosResponse} from 'axios'

export function InboxProvider ({children}) {
    const [inboxList, setInboxList] = useState<InboxItem[]>([]);
    const [update, setUpdate] = useState<number>(0);

    const fetchInbox = async () => {
        try {
            const res: AxiosResponse<InboxItem[]> = await axios.get('../api/inbox/all');
            console.log('fetched inbox : ',res.data);
            setInboxList(res.data)
        } catch (error) {
            console.error();
        }
    }
    
    useEffect(() => {
        fetchInbox()
        console.log('inboxList: ', inboxList);
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