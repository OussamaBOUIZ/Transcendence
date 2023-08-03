import RankContent from "./rankContent";

export default function LeaderBoard({leaders}) {

    const users = [
        {rank: 2, userData: leaders[1], size: "medium"},
        {rank: 1, userData: leaders[0], size: "medium"},
        {rank: 3, userData: leaders[2], size: "medium"}
    ]

    const ThreeUsers = users.map(user => {
        return (
            <div className={`rank rank${user.rank}`} >
                <RankContent
                userData={user.userData}
                size={user.size}
                Rank={user.rank} />
            </div>
        )
    })

    return (
        <div className="item Leaderboard">
            <p>Leaderboard</p>
            <div className="board">
                {ThreeUsers}
            </div>
        </div>
    )
}