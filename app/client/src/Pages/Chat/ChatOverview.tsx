import React, { createContext, useState, useEffect } from 'react';
import ChannelInfo from './ChannelInfo';

// type SetUpdateFunction = (update: number) => void;

export const UpdateContext = createContext({})

export default function ChatOverview() {
    const [update, setUpdate] = useState<number>(0);

    const guidingText = "As channels come alive this box will \
    soon be filled with fellow members. Engage in captivating conversations, share\
    experiences, and foster \
    connections with\
    like-minded individuals\
    ";

    return (
        <div className="chat_overview overflow-hidden">
            <UpdateContext.Provider value={{ update, setUpdate }}>
                <ChannelInfo />
            </UpdateContext.Provider>
        </div>
    );
}
