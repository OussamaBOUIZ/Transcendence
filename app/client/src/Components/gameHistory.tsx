import History from "./history";
import React from "react"
import {PlayerData} from "../../../global/Interfaces"
import wins from "../Assets/Icons/wins.svg"
import losses from "../Assets/Icons/losses.svg"
import { useLocation } from "react-router";

export default function GameHistory({UserData}: {UserData: PlayerData}) {

    const {pathname} = useLocation();
    let header: React.JSX.Element | undefined
    if (pathname === "/")
        header = <p>Game History</p>
    else {
        header = <header>
            <p>Game History</p>
            <div className="NbGames">
                <div className="flex items-center justify-end gap-4">
                    <span><img className='w-3' src={wins} alt="" /> {UserData.stat.wins.toString() + " wins"}</span>
                    <span><img className='w-3' src={losses} alt="" /> {UserData.stat.losses.toString() + " losses"}</span>
                </div>
            </div>
        </header>
    }

      return (
        <div className="item GameHistory">
            {header}
            <div className="games">
                <History userData={UserData} />
                <History userData={UserData} />
                <History userData={UserData} />
            </div>
        </div>
    )
}