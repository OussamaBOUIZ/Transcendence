import React, { useEffect, useState, useContext, useMemo}  from 'react';
import TopicRoom from './TopicRoom';
import Rooms from './Rooms';
import { SocketContext } from './ChatRooms';

interface Elements {
    value: string;
    mode: boolean;
    setter: React.Dispatch<React.SetStateAction<boolean>>;
    type: "public" | "protected" | "private";
}

export default function InboxRooms() {
    const [PublicMode, setPublicMode] = useState<boolean>(true);
    const [ProtectedMode, setProtectedMode] = useState<boolean>(true);
    const [PrivateMode, setPrivateMode] = useState<boolean>(true);
    const [JoinedRooms, setJoinedRooms] = useState<JSX.Element[] | null>(null);

    const array = useMemo<Elements[]>(() => [
        { value: "Public Channels", mode: PublicMode, setter: setPublicMode, type: "public" },
        { value: "Protected Channels", mode: ProtectedMode, setter: setProtectedMode, type: "protected" },
        { value: "Private Channels", mode: PrivateMode, setter: setPrivateMode, type: "private" }
    ], [PublicMode, ProtectedMode, PrivateMode])

    useMemo(() => {
        const updatedRooms = array.map((element) => (
            <>
                <TopicRoom roomType={element.value} mode={element.mode} setter={element.setter} />
                {element.mode && <Rooms type={element.type} />}
            </>
        ));
        setJoinedRooms(updatedRooms);
    }, [array]);

    return (
        <div className="chat_inbox">
            <div className="contentRooms">
                {JoinedRooms}
            </div>
        </div>
    );
}
