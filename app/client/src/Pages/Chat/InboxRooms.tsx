import React, {useState} from 'react'
import TopicRoom from './TopicRoom';
import Rooms from './Rooms';

export default function InboxRooms () {

    const [PublicMode, setPublicMode] = useState<boolean>(true)
    const [ProtectedMode, setProtectedMode] = useState<boolean>(true)
    const [PrivateMode, setPrivateMode] = useState<boolean>(true)

    return (
        <div className="chat_inbox">

            <div className="contentRooms">
                <TopicRoom roomType="Public Channels" mode={PublicMode} setter={setPublicMode} />
                {PublicMode && <Rooms type="public" />}
                <TopicRoom roomType="Protected Channels"mode={ProtectedMode} setter={setProtectedMode} />
                {ProtectedMode && <Rooms type="protected" />}
                <TopicRoom roomType="Private Channels" mode={PrivateMode} setter={setPrivateMode} />
                {PrivateMode && <Rooms type="private" />}
            </div>
        </div>
    )
}