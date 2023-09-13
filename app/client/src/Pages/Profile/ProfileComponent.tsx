import "../../scss/profileComponent.scss";
import GameHistory from "../../Components/gameHistory";
import FriendsCard from "../../Components/friendsCard";
import AchievementCard from "../../Components/achievementCard";
import axios from "axios";
import React, { useContext, useState } from "react";
import {User} from "../../../global/Interfaces"
import UserContext from "../../Context/UserContext";
import block from "../../Assets/Icons/block.svg"
import Friend from "../../Assets/Icons/friend1.svg"
import AddFriend from "../../Assets/Icons/addUser1.svg"
import {NavLink} from "react-router-dom"
import Notification from "../../Components/Notification";

export default function ProfileComponent({UserData}: {UserData: User}) {

    const {user} = useContext(UserContext)
    const [notif, setNotif] = useState<string>("")
    const [isMyFriend, setIsMyFriend] = useState<boolean>(false)
    const [update, setUpdate] = useState<number>(0)

    async function handleBlock() {
        try {
            const res = await axios.post(`/api/user/block/${UserData.id}`)
            if (res.data.length)
                setNotif(res.data)
        }
        catch (err) {
            // console.log(err)
        }
    }

    async function handleFriend() {
        try {
            await axios.post(`/api/user/addfriend/${user.id}?friendId=${UserData.id}`, null)
            setUpdate(prev => prev + 1)
        }
        catch (err) {
            console.log("error : adding an existing friend")
            console.log(err)
        }
    }

    let statusIcon: string;

    switch (UserData.status) {
        case "Online":
            statusIcon = "bg-green-500";
            break;
        case "Offline":
            statusIcon = "bg-slate-600";
            break;
        default:
            statusIcon = "bg-pink-500";
            break;
    }

    const IconFriend = (isMyFriend) ? Friend : AddFriend
    const TextFriend = (isMyFriend) ? 'Friend' : 'Add as Friend';

    return (
        <div className="profileComponent bg- bg-green ">
            {notif && <Notification message={notif} />}
            <div className="item ProfileCard relative pt-4">
                {user.id !== UserData.id && <img className="absolute top-3 right-3 cursor-pointer" src={block} alt="blockUser" onClick={handleBlock} />}
                <div className="head flex flex-col items-center">
                    <div className="image">
                        <img src={UserData.image} alt="" />
                    </div>
                    <div className="flex flex-col items-center gap-4 pb-4" >
                        <div className="flex flex-col items-center">
                            <h1>{UserData.firstname + " " + UserData.lastname}</h1>
                            <h2>{UserData.username}</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${statusIcon}`}></div>
                            <h2>{UserData.status}</h2>
                        </div>
                        <div className="flex flex-col w-full items-center">
                            <p>level {UserData.stat?.ladder_level}</p>
                            <div className="level_bar">
                                <div className="level-bar-fill" style={{ width: `${String(UserData.stat?.levelPercentage)}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    user.id !== UserData.id &&
                    <div className="footer">
                        <button className="friend-request" onClick={handleFriend}>
                            <div className="flex justify-center items-center gap-2">
                                <img src={IconFriend} />
                                {TextFriend}
                            </div>
                        </button>
                        <button className="DM"><NavLink to={`/chat/${UserData.id}`}>send message</NavLink></button>
                    </div>
                }
            </div>
            <GameHistory UserData={UserData} />
            <FriendsCard id={UserData.id} update={update} setIsMyFriend={setIsMyFriend} />
            <AchievementCard achievements={UserData.stat?.achievements} />
        </div>
    )
}