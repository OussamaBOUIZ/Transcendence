import React, {createContext, useState, useEffect} from 'react'

const InboxContext = createContext({});

export function InboxProvider ({children}: {children: React.ReactNode}) {
    const [id, setId] = React.useState();
    return (
        <InboxContext.Provider value={id}>
        {children}
        </InboxContext.Provider>
    )
}