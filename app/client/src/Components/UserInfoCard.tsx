import React, {useState} from 'react';
import wins from "../Assets/Icons/wins2.svg"
import losses from "../Assets/Icons/losses2.svg"
import "../scss/userInfoCard.scss"
import {userInfoCard} from "../../../global/Interfaces"
import AdminPopUp from "../Pages/Chat/AdminPopUp"
import MutePopUp from "../Pages/Chat/MutePopUp"

export default function UserInfoCard(props: userInfoCard) {

    const [isHovered, setIsHovered] = useState(false);
    const [isMuteClicked, setIsClicked] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
      setIsClicked(false)
    };


    return (
        <div className={`element-${isHovered ? "hovered" : ""} friend-item relative overflow-hidden`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            key={props.username}>
            <div className="useData">
                <div className='userImage'>
                    <img src={props.image} alt="" />
                    {props.status && <div className={`status ${props.status}`}></div>}
                </div>
                <div className="friend-name">
                    <div className={`flex ${props.flex === "row" ? 'gap-1' : 'flex-col'}`}>
                        <p>{props.firstname}</p>
                        <p>{props.lastname}</p>
                    </div>
                    {props.username && <span>{props.username}</span>}
                </div>
            </div>
            <div className={`stats flex ${props.flex === "row" ? '' : 'flex-col'}`}>
                <span><img src={wins} alt="" /> {props.wins.toString() + " wins"}</span>
                <span><img src={losses} alt="" /> {props.losses.toString() + " losses"}</span>
            </div>
            {props.isUnderMyGrade && isHovered && <AdminPopUp channelId={props.channelId as number} id={props.id} setIsClicked={setIsClicked} />}
            {isHovered && isMuteClicked && <MutePopUp channelId={props.channelId as number} id={props.id} />}
        </div>
    )
}