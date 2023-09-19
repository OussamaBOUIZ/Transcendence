import React, {useEffect, useState, useContext, useRef} from 'react'
import "../../scss/Game.scss"
import Board from './Board';
import {FaSignOutAlt} from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import { io } from "socket.io-client";
import { useParams } from "react-router-dom"
import { GameMode, Persentage, Score } from './Interfaces';
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
        maxScore: 20
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
    const isWin = useRef<boolean>(false);
    const isEffect = useRef<boolean>(false);
    const oppUser = useRef<User>({} as User);
    const firstTime = useRef<boolean>(true);
    const [socket, setSocket] = useState<any>(null);
    const [gameKey, setGameKey] = useState<string | null>(null);
    const [isMatching, setIsMatching] = useState<boolean>(false);
    const [mode, setMode]  = useState<GameMode | undefined >(undefined);
    const [score, setScore] = useState<Score>({myScore: 0, oppScore: 0});
    const [persentage, setPersentage] = useState<Persentage>({myPersentage: 0, oppPersentage: 0});
    const [isGameEnd, setIsGameEnd] = useState<boolean>(false);
    const {user} = useContext(UserContext);
    
    const {key, gameMode} = useParams();

    const updateDataBase = (finalScore: Score | undefined) => {
        if (gameMode) {
            socket?.emit("saveScore", {
                userScore: finalScore?.myScore,
                opponentScore: finalScore?.oppScore,
                userId: user.id,
                opponentId: oppUser.current.id
            })
            // socket?.emit("achievement", {
            //     userId: user.id,
            //     wonXp: mode?.xp,
            //     gameName: mode?.modeName,
            //     opponentLevel: oppUser.stat?.ladder_level,
            // })
            // })
        }
    }
    
    useEffectOnUpdate(()  => {
        console.log(firstTime.current);
        
        if (!firstTime.current) {
            setInterval(() => {
                setPersentage((prevState) => {
                    return  {...prevState, myPersentage: prevState.myPersentage + 1}
                });
            }, 100)
        }
    }, [firstTime.current])


    useEffect(() => {
        if (persentage.myPersentage >= 100)
            isEffect.current = true;

        socket?.emit("changePersentage", {roomKey: roomKey, persentage: persentage.myPersentage});
        socket?.on("recvPersentage", (per: number) => {
            setPersentage((prevState) => {
                return  {...prevState, oppPersentage: per }
            });
        })
    }, [persentage.myPersentage])

    useEffect(() => {
        socket?.on("scoreChanged", (score: Score) => {
            setScore(score);
        })
        if (!isGameEnd) {
            socket?.on("leaveGame", () => {
                setIsGameEnd(true);
                isWin.current = true;
                if (gameMode)
                    updateDataBase({myScore: mode?.maxScore || 10, oppScore: 0});
                socket?.emit("gameEnd", key);   
                socket?.disconnect();
            })
        }
    }, [socket])

    useEffect(() => {
        if (gameMode && (score.myScore === mode?.maxScore 
                || score.oppScore === mode?.maxScore )) {
            setIsGameEnd(true);
            socket?.emit("gameEnd", gameKey);
            console.log("game end");
        }

        console.log(score.myScore, mode?.maxScore);

        if (gameMode && score.myScore === mode?.maxScore) {
            isWin.current = true;
            updateDataBase(score);
        }
    }, [score])

    useEffectOnUpdate( () => {
        const newSocket: any = io("ws://localhost:4343");
        setSocket(newSocket);
        setMode(gameModes.get(String(gameMode)));

        if (key && gameMode) {
            setGameKey(key);
            newSocket.emit("joinGame", key);
        } else if (gameMode) {
            setIsMatching(true);
            newSocket.emit("gameMatching", {
                modeName: gameModes.get(gameMode)?.modeName,
                xp: mode?.xp,
                user: user,
            });

            newSocket.on("matched", (data: any) => {
                console.log("matched room key: ", data.roomKey);
                setGameKey(data.roomKey);
                roomKey = data.roomKey;
                newSocket.emit("joinGame", data.roomKey);
                oppUser.current = data.user;
                console.log(data.user);
                setIsMatching(false);
            });
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
                {!isMatching && <Board score={score} oppUser={oppUser.current} isHost={isHost} persentage={persentage}/>}
                <ReactP5Wrapper 
                    sketch={sketch}
                    socket={socket}
                    theme="black"
                    isHost={isHost}
                    setIsHost={setIsHost}
                    gameKey={gameKey}
                    gameMode={mode}
                    isMatching={isMatching}
                    score={score}
                    setScore={setScore}
                    isGameEnd={isGameEnd}
                    setIsGameEnd={setIsGameEnd}
                    isWin={isWin.current}
                    isEffect={isEffect}
                    setPersentage={setPersentage}
                    firstTime={firstTime}
                />
            </div>
        </section>
    );
}
