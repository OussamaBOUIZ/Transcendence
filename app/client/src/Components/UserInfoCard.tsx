import React from 'react';
import wins from "../Assets/Icons/wins2.svg"
import losses from "../Assets/Icons/losses2.svg"
import "../scss/userInfoCard.scss"
import {userInfoCard} from "../../../global/Interfaces"
import AdminPopUp from "../Pages/Chat/AdminPopUp"

export default function UserInfoCard(props: userInfoCard) {
    

    return (
        <div className="friend-item relative overflow-hidden" key={props.username}>
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
            <span><img src={wins} alt="" /> {props.wins + " wins"}</span>
            <span><img src={losses} alt="" /> {props.losses + " losses"}</span>
        </div>
        {props.isUnderMyGrade && <AdminPopUp channelId={props.channelId} id={props.id}/>}

    </div>
    )
}