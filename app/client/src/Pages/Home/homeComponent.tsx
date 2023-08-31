import "../../scss/homeComponent.scss";
import GameHistory from '../../Components/gameHistory';
import LeaderBoard from '../../Components/leaderBoard';
import Battles from '../../Components/Battles';
import {User, Leaders} from "../../../../global/Interfaces"
import React from "react"

export default function HomeComponent({ UserData , Leaders} : {UserData: User, Leaders: Leaders[]}) {

    return (
        <>
            <div className="backgroundHomeShadow"></div>
            <div className="leaderboardShadow"></div>
            <div className="homeComponent">
                <Battles />
                <LeaderBoard leaders={Leaders} />
                <GameHistory UserData={UserData} />
            </div>
        </>
    )
}