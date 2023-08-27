import React, {createContext, useState} from 'react'
import { InboxItem } from '../../../global/Interfaces';
const InboxContext = createContext({});

export function InboxProvider ({children}) {
    const [inboxList, setInboxList] = useState<InboxItem[]>([]);

    return (
        <InboxContext.Provider value={{
            inboxList, setInboxList
        }}>
        {children}
        </InboxContext.Provider>
    )
}

export default InboxContext;