import ProfileImage from "./profileImage";
import {User, gameHistory} from "../../global/Interfaces"
import "../scss/history.scss";
import React from "react";

export default function History({userData, gameData}: {userData: User, gameData: gameHistory}) {

    if (gameData.opponentId === userData.id) {
        gameData.userScore ^= gameData.opponentScore
        gameData.opponentScore ^= gameData.userScore
        gameData.opponentId ^= gameData.userId
        gameData.userId ^= gameData.opponentId
        const name = gameData.userName
        gameData.userName = gameData.opponentUserName
        gameData.opponentUserName = name
    }

    return (
        <div className="contentBar">
            <div className="history">
                <div className="w-1/4 flex justify-center items-center">
                    <ProfileImage image={userData.image} name={userData.username} size="small" />
                </div>
                <div className="w-1/4 flex justify-center items-center">
                    <span>{userData.username}</span>
                </div>
                <div className="w-1/4 flex justify-center items-center">
                    <span className="score">{gameData.userScore} - {gameData.opponentScore}</span>
                </div>
                <div className="w-1/4 flex justify-center items-center">
                    <span>{gameData.opponentUserName}</span>
                </div>
                <div className="w-1/4 flex justify-center items-center">
                    <ProfileImage image={gameData.opponentImage} name={gameData.opponentUserName} size="small" />
                </div>
            </div>
        </div>
    )
}