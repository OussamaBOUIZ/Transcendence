import React, { useContext, useState } from "react";
import eyeRegular from "../../Assets/Icons/eye-regular.svg"
import eyeSlashRegular from "../../Assets/Icons/eye-slash-regular.svg"
import Xmark from "../../Assets/Icons/xmark-solid.svg"
import axios from "axios"
import UserContext from "../../Context/UserContext"
import { SocketContext } from "./ChatRooms";

interface newRoom {
    prevChannelName: string,
    channelName: string,
    channelType: "public" | "private" | "protected",
    channelPassword: string,
    channelOwner: number,
}

export default function CreateRoom({action}: {action: string}) {

    const {user} = useContext(UserContext)
    const {socket, roomData, myGrade, setIsClick, setAction, setUpdate} = useContext(SocketContext)

    const [newRoom, setNewRoom] = useState<newRoom>({ prevChannelName: "",channelName: "", channelPassword: "", channelType: "public"} as newRoom)

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

    const handleSubmit = () => {
        newRoom.prevChannelName = "";
        if (roomData?.channelName) newRoom.prevChannelName = roomData?.channelName
        console.log(newRoom)
        try {
            void axios.post(`/api/channel/${action}`, newRoom)
            setIsClick(prev => !prev)
            setUpdate(prev => prev + 1)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleLeaving = () => {
        socket?.emit('leaveAndRemoveChannel', roomData);
        setIsClick(prev => !prev);
        window.location.replace('/chat/rooms')
    }

    const style = ((myGrade === "user" && action === 'update') ? 'pointer-events-none' : '')

    const passwordCard = <div className="setPassword flex flex-col">
                            <label>set a password</label>
                            <form className="flex justify-between gap-3">
                                <input
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
    <div className="createRoom flex flex-col justify-around p-4 gap-5 rounded-2x">
        <div className="flex justify-end">
            <img className="w-6 cursor-pointer" onClick={() => {setAction("create"); setIsClick(prev => !prev)}} src={Xmark} alt="exit" />
        </div>
        <div className="channelName flex flex-col">
            <label>Channel Name</label>
            <input
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
                    <input type="radio" className={style} name="channelType" value="public" onChange={handleChange} defaultChecked/>
                    <label>Public</label>
                </div>
                <div className="flex gap-2 items-center">
                    <input type="radio" className={style} name="channelType" value="private" onChange={handleChange} />
                    <label>Private</label>
                </div>
                <div className="flex gap-2 items-center">
                <input type="radio" className={style} name="channelType" value="protected" onChange={handleChange} />
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