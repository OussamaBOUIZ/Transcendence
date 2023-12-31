import RankContent from "./rankContent";
import {nanoid} from 'nanoid'
import React from "react"
import StarRank from "./starRank";
import { Leaders } from "../../global/Interfaces";

export default function GlobalLeaderBoard({Leaders} : {Leaders: Leaders[]}) {

    if (Leaders.length < 3) {
        return (
            <div className="globalLeaderboard">
                <p>Leaderboard</p>
                <div className="svgIcons">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 389 93" fill="none">
                        <path d="M1 1.56158C83 -7.43836 143.4 94.7616 189 91.5616C286 91.5616 292 -59.4384 390 44.5616" stroke="white" strokeOpacity="0.2"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 389 93" fill="none">
                        <path d="M1 1.56158C83 -7.43836 143.4 94.7616 189 91.5616C286 91.5616 292 -59.4384 390 44.5616" stroke="white" strokeOpacity="0.2"/>
                    </svg>
                </div>
                <div className="w-full h-full flex items-center justify-center text-center p-8">
                    <h2>There is not currently enough data</h2>
                </div>
            </div>
        )
    }

    const topThree = [
        {id: nanoid(), rank: 2, userData: Leaders[1], size: "medium"},
        {id: nanoid(), rank: 1, userData: Leaders[0], size: "medium"},
        {id: nanoid(), rank: 3, userData: Leaders[2], size: "medium"}
    ]


    const RestOfThem = Leaders.slice(3);

    const ThreeUsers = topThree.map((user) => {
        return (
            <div key={user.id} className={`rank rank${user.rank}`} >
                <RankContent
                key={user.id}
                userData={user.userData}
                size="medium"
                Rank={user.rank} />
            </div>
        )
    })

    const TopTwelve = RestOfThem.map((user, index) => {
        return (
            <div key={user.id} className={`topRank`} >
                <StarRank RankNumber={index + 4} color="#A0A0A0" />
                <p>{user.user.username}</p>
                <span><p>{`level ${user.ladder_level}`}</p></span>
            </div>
        )
    })

    return (
        <div className="globalLeaderboard">
            <p>Leaderboard</p>
            <div className="svgIcons">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 389 93" fill="none">
                    <path d="M1 1.56158C83 -7.43836 143.4 94.7616 189 91.5616C286 91.5616 292 -59.4384 390 44.5616" stroke="white" strokeOpacity="0.2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 389 93" fill="none">
                    <path d="M1 1.56158C83 -7.43836 143.4 94.7616 189 91.5616C286 91.5616 292 -59.4384 390 44.5616" stroke="white" strokeOpacity="0.2"/>
                </svg>
            </div>
            <section className="flex flex-col justify-between h-5/6 w-full">
                <div className="board">
                    {ThreeUsers}
                </div>
                <div className="TopTwelve">
                    {Leaders.length <= 12 && TopTwelve}
                </div>
            </section>
        </div>
    )
}