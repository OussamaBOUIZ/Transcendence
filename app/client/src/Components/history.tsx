import ProfileImage from "./profileImage";
import {User} from "../../../global/Interfaces"
import "../scss/history.scss";
import React from "react";

export default function History({userData}: {userData: User}) {
    const score = "3-0"
    const opponent = "ijmari"

    return (
        <div className="contentBar">
            <div className="history">
                <ProfileImage image={userData.image} name={userData.username} size="small" />
                <span>{userData.username}</span>
                <span className="score">{score}</span>
                <span>{opponent}</span>
                <ProfileImage image={userData.image} name={userData.username} size="small" />
            </div>
        </div>
        
    )
}