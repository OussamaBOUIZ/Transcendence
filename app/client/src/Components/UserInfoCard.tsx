import React, {useState} from 'react';
import wins from "../Assets/Icons/wins.svg"
import losses from "../Assets/Icons/losses.svg"
import "../scss/userInfoCard.scss"
import {userInfoCard} from "../../../global/Interfaces"
import AdminPopUp from "../Pages/Chat/AdminPopUp"
import MutePopUp from "../Pages/Chat/MutePopUp"

export default function UserInfoCard(props: userInfoCard) {

    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isMuteClicked, setIsClicked] = useState<boolean>(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
      setIsClicked(false)
    };

    function handleProfileClick() {
        window.location.replace(`/profile/${String(props.username)}`)
    }

    let statusIcon: string;

    switch (props.status) {
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

    return (
        <div className={`element-${isHovered ? "hovered" : ""} friend-item relative overflow-hidden`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            key={props.username}>
            <div className="useData">
                <div className='userImage cursor-pointer' onClick={handleProfileClick}>
                    <img src={props.image} alt="" />
                    {props.status && <div className={`status ${statusIcon}`}></div>}
                </div>
                <div className="friend-name">
                    <div className={`flex ${props.flex === "row" ? 'gap-1' : 'flex-col'}`}>
                        <p>{props.firstname}</p>
                        <p>{props.lastname}</p>
                    </div>
                    {props.username && <span>{props.username}</span>}
                </div>
            </div>
            <div className={`stats flex ${props.flex === "row" ? 'items-center justify-end gap-4' : 'flex-col items-end justify-center'}`}>
                <span><img className='w-3' src={wins} alt="" /> {props.wins.toString() + " wins"}</span>
                <span><img className='w-3' src={losses} alt="" /> {props.losses.toString() + " losses"}</span>
            </div>
            {props.isUnderMyGrade && isHovered && <AdminPopUp Userid={props.id} setIsClicked={setIsClicked} />}
            {isHovered && isMuteClicked && <MutePopUp channelId={props.channelId as number} id={props.id} />}
        </div>
    )
}