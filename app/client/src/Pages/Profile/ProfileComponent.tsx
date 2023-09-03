import "../../scss/profileComponent.scss";
import GameHistory from "../../Components/gameHistory";
import FriendsCard from "../../Components/friendsCard";
import AchievementCard from "../../Components/achievementCard";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import {User} from "../../../../global/Interfaces"
import UserContext from "../../Context/UserContext";
import block from "../../Assets/Icons/block.svg"


export default function ProfileComponent({UserData}: {UserData: User}) {

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

  const {user} = useContext(UserContext)


    const level = 70
    return (
        <div className="profileComponent">
            <div className="item ProfileCard relative">
                {user.id !== UserData.id && <img className="absolute top-3 right-3 cursor-pointer" src={block} alt="blockUser" onClick={handleBlock} />}
                <div className="flex flex-col items-center">
                    <div className="image">
                        <img src={UserData.image} alt="" />
                    </div>
                    <h1>{UserData.firstname + " " + UserData.lastname}</h1>
                    <h2>{UserData.username}</h2>
                </div>
                <h2>{UserData.status}</h2>
                <div className="flex flex-col w-full items-center">
                    <p>level 14</p>
                    <div className="level_bar">
                        <div className="level-bar-fill" style={{ width: `${level}%` }}></div>
                    </div>
                </div>
                {
                    user.id !== UserData.id &&
                    <div className="footer">
                        <button className="friend-request" onClick={handleFriend}>add as friend</button>
                        <button className="DM">send message</button>
                    </div>
                }
            </div>
            <GameHistory UserData={UserData} />
            <FriendsCard user={UserData} />
            <AchievementCard user={UserData} />
        </div>
    )
}