import React, {useState} from 'react';
import wins from "../Assets/Icons/wins.svg"
import losses from "../Assets/Icons/losses.svg"
import "../scss/userInfoCard.scss"
import {userInfoCard} from "../../global/Interfaces"
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
        window.location.href = `/profile/${String(props.username)}`
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
            statusIcon = "bg-green-500 border-2 border-pink-400";
            break;
    }

    return (
        <div className={`overflow-hidden element-${isHovered ? "hovered" : ""} friend-item relative`}
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
                    {props.flex === "row" && props.username && <span>{props.username}</span>}
                </div>
            </div>
            <div className={`stats flex ${props.flex === "row" ? 'sm:flex-row sm:items-center sm:justify-end sm:gap-4' : 'sm:flex-col sm:items-end sm:justify-center'} ${props.flex === "col" ? 'items-center justify-end gap-4' : 'flex-col items-end justify-center'} `}>
                <span><img className='w-3' src={wins} alt="" /> {props.wins.toString() + " wins"}</span>
                <span><img className='w-3' src={losses} alt="" /> {props.losses.toString() + " losses"}</span>
            </div>
            {props.isUnderMyGrade && isHovered && <AdminPopUp Userid={props.id} setIsClicked={setIsClicked} />}
            {isHovered && isMuteClicked && <MutePopUp id={props.id} />}
        </div>
    )
}