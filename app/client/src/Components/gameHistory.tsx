import React from "react"
import History from "./history";

export default function GameHistory({UserData}) {
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


