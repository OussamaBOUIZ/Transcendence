import React, { useState, useMemo }  from 'react';
import TopicRoom from './TopicRoom';
import {useFetchJoinedRooms} from "../../Hooks/useFetchJoinedRooms"
import Rooms from './Rooms';

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

  const {publicRooms, protectedRooms, privateRooms} = useFetchJoinedRooms();


    const array = useMemo<Elements[]>(() => [
        { value: "Public Channels", mode: PublicMode, setter: setPublicMode, rooms: publicRooms },
        { value: "Protected Channels", mode: ProtectedMode, setter: setProtectedMode, rooms: protectedRooms },
        { value: "Private Channels", mode: PrivateMode, setter: setPrivateMode, rooms: privateRooms }
    ], [PublicMode, publicRooms, ProtectedMode, protectedRooms, PrivateMode, privateRooms])

    useMemo(() => {
        const updatedRooms = array.map((element) => (
            <>
                <TopicRoom roomType={element.value} mode={element.mode} setter={element.setter} />
                {element.mode && <Rooms roomsToRender={element.rooms} />}
            </>
        ));
        setJoinedRooms(updatedRooms);
    }, [array]);

    return (
        <div className="chat_inbox overflow-x-hidden overflow-y-scroll">
            <div className="contentRooms ">
                {JoinedRooms}
            </div>
        </div>
    );
}
