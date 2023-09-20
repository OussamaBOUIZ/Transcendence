import History from "./history";
import React, {useEffect, useRef, useState} from "react"
import {User, gameHistory} from "../../global/Interfaces"
import wins from "../Assets/Icons/wins.svg"
import losses from "../Assets/Icons/losses.svg"
import { useLocation } from "react-router"
import axios from "axios";
import { getUserImage } from "../Hooks/getUserImage";
import useEffectOnUpdate from "../Hooks/useEffectOnUpdate";

export default function GameHistory({UserData, NBgames}: {UserData: User, NBgames: number}) {

    const [dataFetch, setDataFetch] = useState<gameHistory[]>([])

    useEffectOnUpdate(() => {
        const fetchGames = async () => {
            try {
                console.log('fetching.......');
                const res = await axios.get<gameHistory[]>(`/api/user/game/history/${UserData.id}/${NBgames}`)
                console.log(res.data);
                
                const datawithImage = await Promise.all(res.data.map(async (game) => {
                    let imageId = (game.opponentId === UserData.id) ? game.userId : game.opponentId
                    game.opponentImage = await getUserImage(imageId)
                    return game;
                }))
                setDataFetch(datawithImage)
            }
            catch (error) {
                // console.log(error)
            }
        }
        if (UserData.id)
            void fetchGames()
    }, [UserData.id])

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
    let data = dataFetch
    console.log(data);
    
    games.current = data?.map((game, index) => {
        return (
            <History key={index} userData={UserData} gameData={game} />
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