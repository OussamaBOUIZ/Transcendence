import History from "./history";
import React, {useRef} from "react"
import {User} from "../../global/Interfaces"
import wins from "../Assets/Icons/wins.svg"
import losses from "../Assets/Icons/losses.svg"
import { useLocation } from "react-router"
import dataFour from "./dataThree.json"
import allData from "./allData.json"

export default function GameHistory({UserData, NBgames}: {UserData: User, NBgames: number}) {

    const games = useRef<React.JSX.Element[]>()
    const {pathname} = useLocation();
    let header: React.JSX.Element | undefined
    if (pathname === "/")
        header = <p>Game History</p>
    else {
        header = <header>
            <p>Game History</p>
            <div className="NbGames">
                <div className="flex items-center justify-end gap-4">
                    <span><img className='w-3' src={wins} alt="" /> {UserData.stat?.wins.toString() + " wins"}</span>
                    <span><img className='w-3' src={losses} alt="" /> {UserData.stat?.losses.toString() + " losses"}</span>
                </div>
            </div>
        </header>
    }
    let data = (NBgames === 4) ? dataFour.dataFour : allData.allData
    games.current = data.map(game => {
        return (
            <History userData={UserData} gameData={game} />
        )
    })

      return (
        <div className="item GameHistory">
            {header}
            <div className="games">
                {games.current}
            </div>
        </div>
    )
}