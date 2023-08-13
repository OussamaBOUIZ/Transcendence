import React, { useState } from "react";
import passwordVisibility from "../../Assets/Icons/eye-regular.svg"
import eyeRegular from "../../Assets/Icons/eye-regular.svg"
import eyeSlashRegular from "../../Assets/Icons/eye-slash-regular.svg"

interface Ids {
    id: number,
}

interface newRoom {
    channelName: string,
    channelType: "Public" | "Private" | "Protected",
    channelPassword?: string,
    channelUsers?: Ids[]
}

export default function CreateRoom() {

    const [newRoom, setNewRoom] = useState<newRoom>({} as newRoom)

    function handleChange(event: { target: { name: string; value: string; }; }) {
        const {name, value} = event.target;
        setNewRoom((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const [inputType, setInputType] = useState('password');

    const toggleInputType = () => {
      setInputType(inputType === 'password' ? 'text' : 'password');
    };

    const handleSubmit = () => {
        console.log(newRoom)
    }


    const passwordCard = <div className="setPassword flex flex-col">
                            <label>set a password</label>
                            <form className="flex justify-between gap-3">
                                <input
                                className="flex-grow"
                                    type={inputType}
                                    placeholder="type password"
                                    name="channelPasswrod"
                                    onChange={handleChange}
                                    value={newRoom.channelPassword}>
                                </input>
                                <img width="36" className="cursor-pointer" src={inputType === 'password' ? eyeRegular : eyeSlashRegular} alt="icon" onClick={toggleInputType} />
                            </form>
                        </div>
    const searchCard = <div className="searchCard flex flex-col">
                            <label>Search</label>
                        </div>


  return (
    <div className="createRoom flex flex-col w-96 h-52 justify-around p-4 rounded-2xl bg-violet-900">
        <div className="channelName flex flex-col">
            <label>Channel Name</label>
            <input
                type="text"
                placeholder="channel name"
                name="channelName"
                onChange={handleChange}
                value={newRoom.channelName}>
            </input>
        </div>
        <div className="channelType flex flex-col">
            <label>Accessiblity</label>
            <form className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <input type="radio" name="channelType" value="Public" onChange={handleChange}/>
                    <label>Public</label>
                </div>
                <div className="flex gap-2 items-center">
                    <input type="radio" name="channelType" value="Private" onChange={handleChange} />
                    <label>Private</label>
                </div>
                <div className="flex gap-2 items-center">
                <input type="radio" name="channelType" value="Protected" onChange={handleChange} />
                    <label>Protected</label>
                </div>
            </form>
        </div>
        {newRoom.channelType === "Protected" && passwordCard}
        {newRoom.channelType === "Private" && searchCard}
        <button className="primary_btn flex items-center justify-center py-3 rounded-3xl text-base bg-pink-500" onClick={handleSubmit}>
            <svg className="mx-3" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 30 30" fill="white">
                <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z"></path>
            </svg>
            Create
        </button>
    </div>
  )
}