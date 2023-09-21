import React, { useState, useMemo, useContext }  from 'react';
import TopicRoom from './TopicRoom';
import {useFetchJoinedRooms} from "../../Hooks/useFetchJoinedRooms"
import Rooms from './Rooms';
import {rooms} from "../../../global/Interfaces"
import UserContext from '../../Context/UserContext';
// import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';
// import { SocketContext } from './ChatRooms';

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
    const {show, navigate} = useContext(UserContext);
    // const {id} = useContext(SocketContext)
    const {publicRooms, protectedRooms, privateRooms} = useFetchJoinedRooms();

    const array = useMemo<Elements[]>(() => [
        { key: "public", value: "Public Channels", mode: PublicMode, setter: setPublicMode, rooms: publicRooms },
        { key: "protected", value: "Protected Channels", mode: ProtectedMode, setter: setProtectedMode, rooms: protectedRooms },
        { key: "private", value: "Private Channels", mode: PrivateMode, setter: setPrivateMode, rooms: privateRooms }
    ], [PublicMode, publicRooms, ProtectedMode, protectedRooms, PrivateMode, privateRooms])


    // useEffectOnUpdate(() => {
    //     console.log(publicRooms);
    //     console.log(protectedRooms);
    //     console.log(privateRooms);

        
    //     if (!publicRooms.some((room) => room.id === Number(id)) &&
    //         !protectedRooms.some((room) => room.id === Number(id)) &&
    //         !privateRooms.some((room) => room.id === Number(id)) && !id
    //         )
    //         navigate('/error', { state: { statusCode: 403, statusText: "Forbidden" } });
            
    // }, [publicRooms, protectedRooms, privateRooms])

    useMemo(() => {
        const updatedRooms = array.map((element) => (
            <div key={element.key}>
                <TopicRoom roomType={element.value} mode={element.mode} value={element.key} setter={element.setter} />
                {element.mode && <Rooms roomsToRender={element.rooms} />}
            </div>
        ));
        setJoinedRooms(updatedRooms);
    }, [array]);

    return (
        <div className={`chat_inbox overflow-x-hidden overflow-y-scroll ${show === 'inbox' ? 'on' : 'off'}`}>
            <div>{JoinedRooms}</div>
        </div>
    );
}
