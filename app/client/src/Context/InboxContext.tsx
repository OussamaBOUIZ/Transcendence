import {createContext, useEffect, useState} from 'react'
import { InboxItem } from '../../../global/Interfaces';
const InboxContext = createContext({});
import axios, {AxiosResponse} from 'axios'

export function InboxProvider ({children}) {
    const [inboxList, setInboxList] = useState<InboxItem[]>([] as InboxItem[]);
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
            inboxList,setInboxList
        }}>
        {children}
        </InboxContext.Provider>
    )
}

export default InboxContext;