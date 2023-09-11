import React, { useState, useMemo, useContext }  from 'react';
import TopicRoom from './TopicRoom';
import {useFetchJoinedRooms} from "../../Hooks/useFetchJoinedRooms"
import Rooms from './Rooms';
import {rooms} from "../../../global/Interfaces"
import {nanoid} from "nanoid"
import UserContext from '../../Context/UserContext';

interface Elements {
    key: string;
    value: string;
    mode: boolean;
    setter: React.Dispatch<React.SetStateAction<boolean>>;
    rooms: rooms[]
}

export default function InboxRooms() {
    const [PublicMode, setPublicMode] = useState<boolean>(true);
    const [ProtectedMode, setProtectedMode] = useState<boolean>(true);
    const [PrivateMode, setPrivateMode] = useState<boolean>(true);
    const [JoinedRooms, setJoinedRooms] = useState<JSX.Element[] | null>(null);
    const {show} = useContext(UserContext)
    const {publicRooms, protectedRooms, privateRooms} = useFetchJoinedRooms();


    const array = useMemo<Elements[]>(() => [
        { key: nanoid(), value: "Public Channels", mode: PublicMode, setter: setPublicMode, rooms: publicRooms },
        { key: nanoid(), value: "Protected Channels", mode: ProtectedMode, setter: setProtectedMode, rooms: protectedRooms },
        { key: nanoid(), value: "Private Channels", mode: PrivateMode, setter: setPrivateMode, rooms: privateRooms }
    ], [PublicMode, publicRooms, ProtectedMode, protectedRooms, PrivateMode, privateRooms])

    useMemo(() => {
        const updatedRooms = array.map((element) => (
            <div key={element.key}>
                <TopicRoom roomType={element.value} mode={element.mode} setter={element.setter} />
                {element.mode && <Rooms roomsToRender={element.rooms} />}
            </div>
        ));
        setJoinedRooms(updatedRooms);
    }, [array]);

    return (
        <div className={`chat_inbox overflow-x-hidden overflow-y-scroll ${show === 'inbox' ? 'on' : 'off'}`}>
            <div className="contentRooms ">
                {JoinedRooms}
            </div>
        </div>
    );
}
