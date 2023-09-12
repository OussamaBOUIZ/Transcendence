import "../../scss/homeComponent.scss";
import GameHistory from '../../Components/gameHistory';
import LeaderBoard from '../../Components/leaderBoard';
import Battles from '../../Components/Battles';
import {Leaders} from "../../../global/Interfaces"
import React, { useContext } from "react"
import UserContext from "../../Context/UserContext";

export default function HomeComponent({Leaders} : {Leaders: Leaders[]}) {

    const {user} = useContext(UserContext)

    return (
        <>
            <div className="backgroundHomeShadow"></div>
            <div className="leaderboardShadow"></div>
            <div className="homeComponent">
                <Battles />
                <LeaderBoard leaders={Leaders} />
                <GameHistory UserData={user} NBgames={4} />
            </div>
        </>
    )
}