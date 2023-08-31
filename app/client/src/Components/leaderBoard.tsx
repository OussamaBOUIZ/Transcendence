import RankContent from "./rankContent";
import {nanoid} from 'nanoid'
import {Leaders} from "../../../global/Interfaces"
import React from "react"
import bg from "../Assets/ice-bg.jpg"

export default function LeaderBoard({leaders} : {leaders: Leaders[]}) {

    if (leaders.length < 3) {
        return (
            <div className="item Leaderboard">
                <img src={bg} alt="" />
                <div className="w-full h-full flex items-center justify-center">
                    <p>There is not currently enough data</p>
                </div>
            </div>
        )
    }

    const users = [
        {id: nanoid(), rank: 2, userData: leaders[1], size: "medium"},
        {id: nanoid(), rank: 1, userData: leaders[0], size: "medium"},
        {id: nanoid(), rank: 3, userData: leaders[2], size: "medium"}
    ]

    const ThreeUsers = users.map(user => {
        return (
            <div className={`rank rank${user.rank}`} >
                <RankContent
                key={user.id}
                userData={user.userData}
                size={user.size}
                Rank={user.rank} />
            </div>
        )
    })

    return (
        <div className="item Leaderboard">
            <img src={bg} alt="" />
            <div className="w-full h-full">
                <p>Leaderboard</p>
                <div className="board">
                    {ThreeUsers}
                </div>
            </div>
        </div>
    )
}