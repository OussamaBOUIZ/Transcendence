import React, { useEffect, useState, useContext } from 'react';
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
    const { update } = useContext(SocketContext);
    const [PublicMode, setPublicMode] = useState<boolean>(true);
    const [ProtectedMode, setProtectedMode] = useState<boolean>(true);
    const [PrivateMode, setPrivateMode] = useState<boolean>(true);
    const [JoinedRooms, setJoinedRooms] = useState<JSX.Element[] | null>(null);

    const array: Elements[] = [
        { value: "Public Channels", mode: PublicMode, setter: setPublicMode, type: "public" },
        { value: "Protected Channels", mode: ProtectedMode, setter: setProtectedMode, type: "protected" },
        { value: "Private Channels", mode: PrivateMode, setter: setPrivateMode, type: "private" }
    ];

    useEffect(() => {
        const updatedRooms = array.map((element) => (
            <>
                <TopicRoom roomType={element.value} mode={element.mode} setter={element.setter} />
                {element.mode && <Rooms type={element.type} />}
            </>
        ));
        setJoinedRooms(updatedRooms);
    }, [PublicMode, ProtectedMode, PrivateMode, update]);

    return (
        <div className="chat_inbox">
            <div className="contentRooms">
                {JoinedRooms}
            </div>
        </div>
    );
}
