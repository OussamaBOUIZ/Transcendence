import "../../scss/profileComponent.scss";
import GameHistory from "../../Components/gameHistory";
import FriendsCard from "../../Components/friendsCard";
import AchievementCard from "../../Components/achievementCard";
import axios from "axios";
import React, { useContext, useState } from "react";
import {PlayerData} from "../../../../global/Interfaces"
import UserContext from "../../Context/UserContext";
import block from "../../Assets/Icons/block.svg"


export default function ProfileComponent({UserData}: {UserData: PlayerData}) {

    // useEffect(() => {
    //     const SendRequest = async () => {
    //         try {
    //             await axios.post(`/api/user/addfriend/${UserData.id}?friendId=3`, null)
    //         }
    //         catch (err) {
    //             console.log("error : adding an existing friend")
    //             console.log(err)
    //         }
    //     }
    //     void SendRequest();
    // }, [UserData.id])

    async function handleBlock() {
        try {
            await axios.post(`/api/user/block/${UserData.id}`)
        }
        catch (err) {
            // console.log(err)
        }
    }

    async function handleFriend() {
        console.log("friend")
        try {
            await axios.post(`/api/user/addfriend/${user.id}?friendId=${UserData.id}`, null)
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

    const {user} = useContext(UserContext)
    const [isMyFriend, setIsMyFriend] = useState<boolean>(false)

    return (
        <div className="profileComponent bg- bg-green ">
            <div className="item ProfileCard relative">
                {user.id !== UserData.id && <img className="absolute top-3 right-3 cursor-pointer" src={block} alt="blockUser" onClick={handleBlock} />}
                <div className="image">
                    <img src={UserData.image} alt="" />
                </div>
                <div className="flex flex-col items-center gap-2" >
                    <div className="flex flex-col items-center">
                        <h1>{UserData.firstname + " " + UserData.lastname}</h1>
                        <h2>{UserData.username}</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${statusIcon}`}></div>
                        <h2>{UserData.status}</h2>
                    </div>
                    <div className="flex flex-col w-full items-center">
                        <p>level {UserData.stat.ladder_level}</p>
                        <div className="level_bar">
                            <div className="level-bar-fill" style={{ width: `${String(UserData.stat.levelPercentage)}%` }}></div>
                        </div>
                    </div>
                </div>
                {
                    user.id !== UserData.id &&
                    <div className="footer">
                        <button className="friend-request" onClick={handleFriend}>{isMyFriend ? 'Friend' : 'add as friend'}</button>
                        <button className="DM">send message</button>
                    </div>
                }
            </div>
            <GameHistory UserData={UserData} />
            <FriendsCard userData={UserData} setIsMyFriend={setIsMyFriend} />
            <AchievementCard user={UserData} />
        </div>
    )
}