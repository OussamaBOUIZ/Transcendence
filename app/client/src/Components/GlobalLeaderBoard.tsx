import RankContent from "./rankContent";
import {nanoid} from 'nanoid'
import StarRank from "./starRank";
import { Leaders } from "../../../global/Interfaces";

export default function GlobalLeaderBoard({Leaders} : {Leaders: Leaders[]}) {

    const users = [
        {id: nanoid(), rank: 2, userData: Leaders[1], size: "medium"},
        {id: nanoid(), rank: 1, userData: Leaders[0], size: "medium"},
        {id: nanoid(), rank: 3, userData: Leaders[2], size: "medium"}
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
    const topEleven = users.map(user => {
        return (
            <>
                <div className={`topRank`} >
                    <StarRank RankNumber={4} color="#A0A0A0" />
                    <p>{user.userData.user.username}</p>
                    <span><p>{`level 0`}</p></span>
                </div>
                <div className={`topRank`} >
                    <StarRank RankNumber={4} color="#A0A0A0" />
                    <p>{user.userData.user.username}</p>
                    <span><p>{`level 0`}</p></span>
                </div>
                <div className={`topRank`} >
                    <StarRank RankNumber={4} color="#A0A0A0" />
                    <p>{user.userData.user.username}</p>
                    <span><p>{`level 0`}</p></span>
                </div>
            </>
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
            <div className="board">
                {ThreeUsers}
            </div>
            <div className="topEleven">
                {users.length < 12 && topEleven}
            </div>
        </div>
    )
}