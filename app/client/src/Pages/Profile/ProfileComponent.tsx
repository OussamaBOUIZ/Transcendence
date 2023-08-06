import "../../scss/profileCompenent.scss";
import GameHistory from "../../Components/gameHistory";
import profileImage from "../../Assets/DreamShaper_32_young_man_character_playing_ping_pong_full_body_3.jpeg"
import StarRank from "../../Components/starRank";
import FriendsCard from "../../Components/friendsCard";
import AchievementCard from "../../Components/achievementCard";
import axios from "axios";
import { useEffect } from "react";


export default function ProfileCompenent({UserData}) {

    useEffect(() => {
        const SendRequest = async () => {
            try {
                if(UserData)
                    await axios.post(`api/user/addfriend/${UserData.id}?friendId=3`, null)
            }
            catch (err) {
                console.log("error : adding an existing friend")
                console.log(err)
            }
        }
        SendRequest();
    }, [])
    
    if (!UserData) {
        return null;
    }
    const level = 70
    return (
        <div className="profileCompenent">
            <div className="item ProfileCard">
                <div className="image">
                    <img src={profileImage} alt="" />
                    <StarRank RankNumber={1}/>
                </div>
                <h2>{UserData.firstname + " " + UserData.lastname}</h2>
                <p>{UserData.username}</p>
                <p>online</p>
                <p>level 14</p>
                <div className="level_bar">
                    <div className="level-bar-fill" style={{ width: `${level}%` }}></div>
                </div>
                <div className="footer">
                    <button className="friend-request">add as friend</button>
                    <button className="DM">send message</button>
                </div>
            </div>
            <GameHistory UserData={UserData} />
            <FriendsCard user={UserData} />
            <AchievementCard user={UserData} />
        </div>
    )
}