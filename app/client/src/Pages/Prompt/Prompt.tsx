import "../../scss/prompt.scss";
import Notification from "../../Components/Notification"
import axios from "axios";
import { useState, useEffect } from "react";
import {getUserData} from "../../Hooks/getUserData";
import {Data} from "../../../../global/Interfaces";
import UserName from "./userName";
import FullName from "./fullName";
import {setFullName} from "../../Hooks/setFullName"


export default function Prompt() {

    const userData = getUserData();
    const [notif, setNotif] = useState("")

    
    // const [username, setUsername] = useState<string>("")
    const [data, setData] = useState<Data>({firstname: "", lastname: "", username: ""})
    const [val, increment] = useState<number>(0)
    const updateFullName = setFullName(setData);

    if (!userData)
        return null;

    const handleSubmit = () => {
        // setData(prev => ({
        //     ...prev,
        //     firstname: fullName.firstname,
        //     lastname: fullName.lastname,
        //     username: username,
        // }))
        const sendData = async () => {
            try {
                await axios.post(`/api/user/setUserData/${userData.id}`, data)
                increment(prev => prev + 1)
                console.log("successfuly")
            }
            catch (err) {
                console.log(err)
                // setNotif
            }
        }
        sendData();
    };

    const handleChange = (event: { target: { value: string; }; }) => {
        const { value } = event.target;
        setData(prev => ({
            ...prev,
            username: value,
        }))
    };

    let icon;
    (val) ?
    icon = <UserName username={data.username} user={userData.username} handleChange={handleChange} /> :
    icon = <FullName fullName={data} user={userData} handleChange={updateFullName} />

  return (
    <div className="info-body">
        {notif && <Notification message={notif} />}
        <div className="info-container">
            {icon}
            <div className="buttons">
                <button className="skip">skip</button>
                <button className="update" onClick={handleSubmit}>update</button>
            </div>
        </div>
    </div>
  );
}