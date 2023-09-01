import History from "./history";
import React from "react"
import {User} from "../../../global/Interfaces"

export default function GameHistory({UserData}: {UserData: User}) {

    // if (leaders.length < 3) {
    //     return (
    //         <div className="item Leaderboard">
    //             <img src={bg} alt="" />
    //             <div className="w-full h-full flex items-center justify-center">
    //                 <p>There is not currently enough data</p>
    //             </div>
    //         </div>
    //     )
    // }

      return (
        <div className="item GameHistory">
            <p>Game History</p>
            <div className="games">
                <History userData={UserData} />
                <History userData={UserData} />
                <History userData={UserData} />
            </div>
        </div>
    )
}