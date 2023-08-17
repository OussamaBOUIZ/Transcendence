import React from "react";
import "../../scss/prompt.scss";
import Notification from "../../Components/Notification"
import axios from "axios";
import { useState } from "react";
import {getUserData} from "../../Hooks/getUserData";
import {Data} from "../../../../global/Interfaces";
import UserName from "./userName";
import FullName from "./fullName";
import ChangeAvatar from "./changeAvatar";
import {setFullName} from "../../Hooks/setFullName"


export default function Prompt() {

    const userData = getUserData();
    const [notif, setNotif] = useState("")
    const [imagePreview, setImagePreview] = useState<string | null>(null);


    const [data, setData] = useState<Data>({firstname: "", lastname: "", username: ""})
    const [val, increment] = useState<number>(0)
    const updateFullName = setFullName(setData);

    if (!userData)
        return null;

    const clearFields = () => {
        setData({
            firstname: "",
            lastname: "",
            username: ""
        });
    };

    function checkInput(): boolean {
        if (!val && (data.firstname === '' || data.lastname === '')) {
            setNotif('Please enter your full name')
            return true;
        }
        if (val === 1 && data.username === '') {
            setNotif('Please enter your user name')
            return true;
        }
        return false;
    }

    const handleSubmit = () => {
        setNotif('')
        const sendData = async (Path: string, data: Data | FormData | null, headers: {'Content-Type': string} | null) => {
            try {
                if (data) {
                    await axios.post(Path, data, headers)
                    increment(prev => prev + 1)
                    clearFields()
                }
                if (val === 2)
                    window.location.replace('/')
            }
            catch (error) {
                setNotif(error.response.data)
            }
        }
        if (checkInput())
            return
        let Path: string;
        let headers = null;
        (val === 2) ? Path = `/api/user/${userData.id}/upload` : Path = `/api/user/setUserData/${userData.id}`
        if (val === 2) {
            headers = {
                'Content-Type': 'multipart/form-data',
            };
            let formData: FormData | null = new FormData();
            imagePreview ? formData.append('image', imagePreview) : formData = null
            void sendData(Path, formData, headers);
            
        }
        else
            void sendData(Path, data, headers);
    };

    let icon;
    switch (val) {
        case 1:
            icon = <UserName username={data.username} user={userData.username} handleChange={updateFullName} />
            break;
        case 2:
            icon = <ChangeAvatar user={userData} imagePreview={imagePreview} setImagePreview={setImagePreview} />
            break;
        default:
            icon = <FullName fullName={data} user={userData} handleChange={updateFullName} />
            break;
    }

  return (
    <div className="info-body">
        {notif && <Notification message={notif} />}
        <div className="info-container">
            {icon}
            <div className="buttons">
                <button className={`skip step${val}`} onClick={() => {increment(prev => prev - 1)}} >back</button>
                <button className="update" onClick={handleSubmit}>apply</button>
            </div>
        </div>
    </div>
  );
}