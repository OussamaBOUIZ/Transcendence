import React, { createContext, useState, useEffect } from 'react';
import ContactDetail from './ContactDetail';
import ChannelInfo from './ChannelInfo';
import { getUserData } from '../../Hooks/getUserData';

type SetUpdateFunction = (update: number) => void;

export const UpdateContext = createContext({
  update: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setUpdate: (_update: number) => {}
} as { update: number; setUpdate: SetUpdateFunction });



export default function ChatOverview() {
    const [update, setUpdate] = useState<number>(0);

    const user = getUserData();

    const guidingText = "As channels come alive this box will \
    soon be filled with fellow members. Engage in captivating conversations, share\
    experiences, and foster \
    connections with\
    like-minded individuals\
    ";

    console.log(update);

    return (
        <div className="chat_overview overflow-hidden">
            <UpdateContext.Provider value={{ update, setUpdate }}>
                <ChannelInfo user={user} />
            </UpdateContext.Provider>
        </div>
    );
}
