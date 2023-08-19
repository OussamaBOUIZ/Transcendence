import React, {useState, useEffect} from 'react'
import TopicRoom from './TopicRoom';
import CreateRoom from './createRoom';
import Rooms from './Rooms';

export default function InboxRooms ({setRoom, setChat}) {

    const [isClick, setIsClick] = useState<boolean>(false)

    const [PublicMode, setPublicMode] = useState<boolean>(true)
    const [ProtectedMode, setProtectedMode] = useState<boolean>(true)
    const [PrivateMode, setPrivateMode] = useState<boolean>(true)
    const initState = false;
    const [refresh, setRefresh] = useState<number>(0)

    useEffect(() => {
        // refresh the component
        setRefresh(prev => prev + 1)
    }, [isClick])

    console.log(isClick)


    return (
        <div>
            {
                isClick &&
                <div className="popUp absolute flex items-center justify-center">
                    <CreateRoom setter={setIsClick}/>
                </div>
            }
            <section className="inbox">
                <nav>
                    <button>Messages<span></span></button>
                    <button className="active">Channels<span></span></button>
                </nav>
                {
                initState 
                &&
                    <aside>
                        <p>No DMs available Yet
                        Unlock a world of gaming
                        excitement, by creating 
                        or joining existing ones
                        </p>
                    </aside>
                }
                <div className="contentRooms">
                    <TopicRoom roomType="Public Channels" mode={PublicMode} setter={setPublicMode} clicked={setIsClick} />
                    {PublicMode && <Rooms type="public"setRoom={setRoom} setChat={setChat} />}
                    <TopicRoom roomType="Protected Channels"mode={ProtectedMode} setter={setProtectedMode} clicked={setIsClick} />
                    {ProtectedMode && <Rooms type="protected"setRoom={setRoom} setChat={setChat} />}
                    <TopicRoom roomType="Private Channels" mode={PrivateMode} setter={setPrivateMode} clicked={setIsClick} />
                    {PrivateMode && <Rooms type="private" setRoom={setRoom} setChat={setChat} />}
                </div>
            </section>
        </div>
    );
}