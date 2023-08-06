import RankContent from "./rankContent";
import {nanoid} from 'nanoid'
import StarRank from "./starRank";

export default function GlobalLeaderBoard({Leaders}) {

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
                    <StarRank RankNumber={4} />
                    <p>{user.userData.user.firstname + " " + user.userData.user.lastname}</p>
                    <span><p>{`level 0`}</p></span>
                </div>
                <div className={`topRank`} >
                    <StarRank RankNumber={4} />
                    <p>{user.userData.user.firstname + " " + user.userData.user.lastname}</p>
                    <span><p>{`level 0`}</p></span>
                </div>
                <div className={`topRank`} >
                    <StarRank RankNumber={4} />
                    <p>{user.userData.user.firstname + " " + user.userData.user.lastname}</p>
                    <span><p>{`level 0`}</p></span>
                </div>
                <div className={`topRank`} >
                    <StarRank RankNumber={4} />
                    <p>{user.userData.user.firstname + " " + user.userData.user.lastname}</p>
                    <span><p>{`level 0`}</p></span>
                </div>
            </>
        )
    })

    return (
        <div className="item Leaderboard">
            <p>Leaderboard</p>
            <div className="board">
                {ThreeUsers}
            </div>
            <div className="topEleven">
                {topEleven}
            </div>
        </div>
    )
}