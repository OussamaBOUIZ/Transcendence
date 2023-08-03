import React from "react";
import { useState } from "react"
import ProfileImage from "./profileImage";
import "../scss/history.scss";

export default function History({userData}) {
    // const username = "oouazize"
    const score = "3-0"
    const opponent = "ijmari"

    return (
        <div className="contentBar">
            <div className="history">
                <ProfileImage userData={userData} size="small" />
                <span>{userData?.username}</span>
                <span className="score">{score}</span>
                <span>{opponent}</span>
                <ProfileImage userData={userData} size="small" />
            </div>
        </div>
        
    )
}