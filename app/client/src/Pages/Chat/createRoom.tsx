import React, { useContext, useState } from "react";
import eyeRegular from "../../Assets/Icons/eye-regular.svg"
import eyeSlashRegular from "../../Assets/Icons/eye-slash-regular.svg"
import Xmark from "../../Assets/Icons/xmark-solid.svg"
import axios from "axios"
import UserContext from "../../Context/UserContext"
import { SocketContext } from "./ChatRooms";
import InboxContext from "../../Context/InboxContext";
import {handleClickOutside} from "../../Helpers/utils"

interface newRoom {
    channelId: number,
    channelName: string,
    channelType: string,
    channelPassword: string,
    channelOwner: number,
}

export default function CreateRoom({action, defaultValue}: {action: string, defaultValue: string}) {

    const {user, setNotif, navigate} = useContext(UserContext)
    const {isBanned} = useContext(InboxContext)
    const {socket, roomData, myGrade, setIsClick, setAction, setUpdate, setDefaultRoomType} = useContext(SocketContext)

    const [newRoom, setNewRoom] = useState<newRoom>({ channelId: 0,channelName: "", channelPassword: "", channelType: defaultValue, channelOwner: 0})
    const wrapperRef = handleClickOutside(setIsClick)


    function handleChange(event: { target: { name: string; value: string; }; }) {
        const { name, value } = event.target;
        setNewRoom((prev) => ({
        ...prev,
        channelOwner: user.id,
        [name]: value,
        }));
    }

    const [inputType, setInputType] = useState('password');

    const toggleInputType = () => {
      setInputType(inputType === 'password' ? 'text' : 'password');
    };

    const handleSubmit = async () => {
        setDefaultRoomType("public");
        if (roomData?.channelId)
            newRoom.channelId = roomData?.channelId
        try {
            const data = {prevName: roomData.channelName, channelId: newRoom.channelId}
            const res = await axios.post<string>(`/api/channel/${action}`, newRoom)
            if (res.data.length)
                setNotif(res.data)
            if (action === 'update')
                socket?.emit('NotifUpdateChanneName', data)
            setIsClick(prev => !prev)
            setUpdate(prev => prev + 1)
        }
        catch (err: any) {
            navigate('/error', { state: { statusCode: err.response.status, statusText: err.response.statusText } });
        }
    }

    const handleLeaving = () => {
        socket?.emit('leaveAndRemoveChannel', roomData);
        setIsClick(prev => !prev);
        setDefaultRoomType("public");
        navigate('/chat/rooms')
    }

    const style = (((myGrade === "user" || isBanned) && action === 'update') ? 'pointer-events-none' : '')

    const passwordCard = <div className="setPassword flex flex-col">
                            <label>set a password</label>
                            <form className="flex justify-between gap-3">
                                <input
                                autoFocus
                                className="flex-grow"
                                    type={inputType}
                                    placeholder="type password"
                                    name="channelPassword"
                                    onChange={handleChange}
                                    value={newRoom.channelPassword}>
                                </input>
                                <img width="50" className="cursor-pointer" src={inputType === 'password' ? eyeRegular : eyeSlashRegular} alt="icon" onClick={toggleInputType} />
                            </form>
                        </div>

  return (
    <div className="createRoom flex flex-col justify-around p-4 gap-5 rounded-2x" ref={wrapperRef}>
        <div className="flex justify-end">
            <img className="w-6 cursor-pointer" onClick={() => {setDefaultRoomType("public"); setAction("create"); setIsClick(prev => !prev)}} src={Xmark} alt="exit" />
        </div>
        <div className="channelName flex flex-col">
            <label>Channel Name</label>
            <input
                autoFocus
                type="text"
                placeholder="channel name"
                className={`${style}`}
                name="channelName"
                onChange={handleChange}
                value={newRoom.channelName}>
            </input>
        </div>
        <div className="channelType flex flex-col">
            <label>Accessiblity</label>
            <form className="flex justify-between items-center" >
                <div className="flex gap-2 items-center">
                    <input type="radio" className={style} name="channelType" value="public" onChange={handleChange} defaultChecked={defaultValue === 'public'}/>
                    <label>Public</label>
                </div>
                <div className="flex gap-2 items-center">
                    <input type="radio" className={style} name="channelType" value="private" onChange={handleChange} defaultChecked={defaultValue === 'private'}/>
                    <label>Private</label>
                </div>
                <div className="flex gap-2 items-center">
                <input type="radio" className={style} name="channelType" value="protected" onChange={handleChange} defaultChecked={defaultValue === 'protected'}/>
                    <label>Protected</label>
                </div>
            </form>
        </div>
        {newRoom.channelType === "protected" && passwordCard}
        <div className="flex justify-between">
            <button className={`primary_btn flex items-center justify-center py-3 px-9 rounded-3xl text-base bg-pink-500 ${style}`} onClick={handleSubmit}>
                {action}
            </button>
            {myGrade !== "owner" && action === 'update' && <button className="primary_btn flex items-center justify-center py-3 px-9 rounded-3xl text-base border-white border-2 hover:bg-white hover:text-primary-color" onClick={handleLeaving} >
                Leave channel
            </button>}
        </div>
    </div>
  )
}