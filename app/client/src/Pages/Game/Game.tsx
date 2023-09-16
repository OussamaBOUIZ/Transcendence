import React, {useEffect, useState, useContext} from 'react'
import "../../scss/Game.scss"
import Board from './Board';
import {FaSignOutAlt} from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import {io} from "socket.io-client";
import { useParams } from "react-router-dom"
import { GameMode, Score } from './Interfaces';
import { ReactP5Wrapper } from "react-p5-wrapper"
import sketch from "./Skitch"
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';
import UserContext from '../../Context/UserContext';
import { User } from '../../../global/Interfaces';


let gameModes = new Map<String, GameMode>([
    ["BattleRoyal", {
        modeName: "BattleRoyal",
        ball: "fireBall.png",
        background: "galaxy.jpg",
        paddle: "paddle.png",
        color: {r: 255, g: 154, b: 0, a: 1},
        xp: 6000,
        maxScore: 9
    }],
    ["TheBeat", {
        modeName: "TheBeat",
        ball: "fireBall.png",
        paddle: "paddle.png",
        background: "fire-game.jpg",
        color: {r: 135, g: 206, b: 235, a: 1},
        xp: 5000,
        maxScore: 7
    }],
    ["IceLand", {
        modeName: "IceLand",
        ball: "iceBall.png",
        paddle: "paddle.png",
        background: "galaxy.jpg",
        color: {r: 135, g: 206, b: 235, a: 1},
        xp: 4000,
        maxScore: 2
    }],
    ["BrighGround", {
        modeName: "BrighGround",
        ball: "fireBall.png",
        paddle: "paddle.png",
        background: "fire-game.jpg",
        color: {r: 135, g: 206, b: 235, a: 1},
        xp: 3000,
        maxScore: 5
    }],
]);

let roomKey: string;


export default function Game () {
    const [isHost, setIsHost] = useState<boolean>(true);
    const [socket, setSocket] = useState<any>(null);
    const [gameKey, setGameKey] = useState<string | null>(null);
    const [isMatching, setIsMatching] = useState<boolean>(false);
    const [mode, setMode]  = useState<GameMode>();
    const [score, setScore] = useState<Score>({myScore: 0, oppScore: 0});
    const [oppUser, setOppUser] = useState<User>({} as User);
    const [isGameEnd, setIsGameEnd] = useState<boolean>(false);
    const [isWin, setIsWin] = useState<boolean>(false);
    const {user} = useContext(UserContext);
    
    const {key, gameMode} = useParams();

    const updateDataBase = (finalScore: Score | undefined) => {
        if (gameMode) {
            socket?.emit("saveScore", {
                userScore: finalScore?.myScore,
                opponentScore: finalScore?.oppScore,
                userId: user.id,
                opponentId: oppUser.id || 1000
            })
            // socket?.emit("achievement", {
            //     userId: user.id,
            //     wonXp: gameModes.get(gameMode)?.xp,
            //     gameName: gameModes.get(gameMode)?.modeName,
            //     opponentLevel: oppUser.stat?.ladder_level,
            // })
        }
    }

    useEffect(() => {
        socket?.on("scoreChanged", (score: Score) => {
            setScore(score);
        })
        socket?.on("leaveGame", () => {
            setIsGameEnd(true);
            setIsWin(true);
            if (gameMode)
                updateDataBase({myScore: gameModes.get(gameMode)?.maxScore, oppScore: 0})
            socket?.emit("gameEnd", key);
            socket?.disconnect()
        })
    }, [socket])

    useEffect(() => {
        if (gameMode && (score.myScore === gameModes.get(gameMode)?.maxScore 
                || score.oppScore === gameModes.get(gameMode)?.maxScore )) {
            setIsGameEnd(true);
            socket?.emit("gameEnd", gameKey)
            console.log("game end");
            // socket.disconnect();
        }

        if (gameMode && score.myScore === gameModes.get(gameMode)?.maxScore) {
            setIsWin(true);
            updateDataBase(score);
        }
    }, [score])


    useEffectOnUpdate( () => {
        const newSocket: any = io("ws://localhost:4343");
        setSocket(newSocket);
        setMode(gameModes.get(String(gameMode)))

        if (key && gameMode) {
            setGameKey(key);
            roomKey = key;
            newSocket.emit("joinGame", key);
        } else if (gameMode) {
            setIsMatching(true);
            newSocket.emit("gameMatching", {
                modeName: gameModes.get(gameMode)?.modeName,
                xp: gameModes.get(gameMode)?.xp,
                user: user,
            })

            newSocket.on("matched", (data: any) => {
                console.log("matched room key: ", data.roomKey);
                setGameKey(data.roomKey);
                roomKey = data.roomKey;
                newSocket.emit("joinGame", data.roomKey);
                setOppUser(data.user);
                console.log(data.user);
                setIsMatching(false);
            })
        }


        return () => {
            console.log("component unmount");
            newSocket.emit("gameEnd", roomKey);
            newSocket.disconnect();
        };
    }, [])


    return (
        <section className="flex flex-col justify-center items-center w-full h-full">
            {/* <div className='usersBG absolute flex w-full h-full top-0'>
                <div className='users leftUser'><img src={img} alt="" /></div>
                <div className='users rightUser'><img src={img2} alt="" /></div>
            </div> */}
            <NavLink to={'/'} className="logout absolute cursor-pointer z-50">
                <FaSignOutAlt />
            </NavLink>
            <div className='bg absolute w-full h-full top-0'></div>
            <div className='main-container flex flex-col justify-center gap-1'>
                {!isMatching && <Board score={score} oppUser={oppUser} isHost={isHost}/>}
                <ReactP5Wrapper 
                    sketch={sketch}
                    socket={socket}
                    theme="black"
                    isHost={isHost}
                    setIsHost={setIsHost}
                    gameKey={gameKey}
                    gameMode={mode}forFeature
                    isMatching={isMatching}
                    score={score}
                    setScore={setScore}
                    isGameEnd={isGameEnd}
                    setIsGameEnd={setIsGameEnd}
                    isWin={isWin}
                />
            </div>
        </section>
    );
}
