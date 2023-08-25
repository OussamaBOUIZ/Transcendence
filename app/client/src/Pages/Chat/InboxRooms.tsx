import React, {useState} from 'react'
import TopicRoom from './TopicRoom';
import CreateRoom from './createRoom';
import Rooms from './Rooms';

export default function InboxRooms () {

    const [isClick, setIsClick] = useState<boolean>(false)
    const [PublicMode, setPublicMode] = useState<boolean>(true)
    const [ProtectedMode, setProtectedMode] = useState<boolean>(true)
    const [PrivateMode, setPrivateMode] = useState<boolean>(true)

    return (
        <div className="chat_inbox">
            {
                isClick &&
                <div className="popUp absolute flex items-center justify-center">
                    <CreateRoom setter={setIsClick}/>
                </div>
            }
            <div className="contentRooms">
                <TopicRoom roomType="Public Channels" mode={PublicMode} setter={setPublicMode} clicked={setIsClick} />
                {PublicMode && <Rooms type="public" />}
                <TopicRoom roomType="Protected Channels"mode={ProtectedMode} setter={setProtectedMode} clicked={setIsClick} />
                {ProtectedMode && <Rooms type="protected" />}
                <TopicRoom roomType="Private Channels" mode={PrivateMode} setter={setPrivateMode} clicked={setIsClick} />
                {PrivateMode && <Rooms type="private" />}
            </div>
        </div>
    )
}