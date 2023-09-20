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
import BattleRoyal from "../../Assets/GameArea/BattleRoyal.jpg"
import BlazingPong from "../../Assets/GameArea/BlazingPong.jpg"
import ArcticPong from "../../Assets/GameArea/ArcticPong.jpg"
import RetroPong from "../../Assets/GameArea/RetroPong.jpg"
import axios from 'axios';

let ModeImages = [BattleRoyal, BlazingPong, ArcticPong, RetroPong]

let gameModes = new Map<String, GameMode>([
    ["BattleRoyal", {
        modeName: "BattleRoyal",
        ball: "fireBall.png",
        background: "BattleRoyal.jpg",
        paddle: "paddle.png",
        color: {r: 255, g: 154, b: 0, a: 1},
        xp: 6000,
        maxScore: 14,
        ability: ""
    }],
    ["BlazingPong", {
        modeName: "BlazingPong",
        ball: "fireBall.png",
        paddle: "paddle.png",
        background: "BlazingPong.jpg",
        color: {r: 255, g: 154, b: 0, a: 1},
        xp: 5000,
        maxScore: 11,
        ability: "speed"
    }],
    ["ArcticPong", {
        modeName: "ArcticPong",
        ball: "iceBall.png",
        paddle: "paddle.png",
        background: "ArcticPong.jpg",
        color: {r: 135, g: 206, b: 235, a: 1},
        xp: 4000,
        maxScore: 8,
        ability: "speed"
    }],
    ["RetroPong", {
        modeName: "RetroPong",
        ball: "iceBall.png",
        paddle: "paddle.png",
        background: "RetroPong.jpg",
        color: {r: 135, g: 206, b: 235, a: 1},
        xp: 3000,
        maxScore: 5,
        ability: "reverse"
    }],
]);

const abilities: string[] = ["hide", "reverse", "speed"]

let roomKey: string;

export default function Game () {
    const [isHost, setIsHost] = useState<boolean>(true);
    const isWin = useRef<boolean>(false);
    const isEffect = useRef<boolean>(false);
    const oppUser = useRef<User>({} as User);
    const [firstTime, setFirstTime] = useState<boolean>(true);
    const [socket, setSocket] = useState<any>(null);
    const [gameKey, setGameKey] = useState<string | null>(null);
    const [isMatching, setIsMatching] = useState<boolean>(false);
    const [mode, setMode]  = useState<GameMode>();
    const [score, setScore] = useState<Score>({myScore: 0, oppScore: 0});
    const [persentage, setPersentage] = useState<Persentage>({myPersentage: 0, oppPersentage: 0});
    const [isGameEnd, setIsGameEnd] = useState<boolean>(false);
    const {user} = useContext(UserContext);
    const [ability, setAbility] = useState<string>(mode?.ability || "");
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const {key, gameMode} = useParams();

    const updateDataBase = (finalScore: Score | undefined) => {
        if (gameMode) {
            socket?.emit("saveScore", {
                userScore: finalScore?.myScore,
                opponentScore: finalScore?.oppScore,
                userId: user.id,
                opponentId: oppUser.current.id
            })
            socket?.emit("achievement", {
                userId: user.id,
                wonXp: mode?.xp,
                gameName: mode?.modeName,
                opponentLevel: oppUser.current.stat?.ladder_level,
                opponentId: oppUser.current.id,
            })
        }
    }

    const UpdateStatus = async () => {
        try {
            void axios.put('/api/user/updateStatus', {status: "InGame"})
        }
        catch (error) {
          // console.log(error)
        }
    }
    
    useEffectOnUpdate(()  => {
        if (!firstTime && persentage.myPersentage < 100) {
            setInterval(() => {
                setPersentage((prevState) => {
                    return  {...prevState, myPersentage: prevState.myPersentage + 1}
                });
            }, 100)
        }
    }, [firstTime])


    useEffect(() => {
        if (persentage.myPersentage >= 100 && !isEffect.current) {
            isEffect.current = true;
            if (mode && mode.modeName === "BattleRoyal") {
                mode.ability = abilities[Math.floor(Math.random() * 3)];
                setAbility(mode.ability);
            }
        }

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

        socket?.on("leaveGame", () => {
            setIsGameEnd(true);
            isWin.current = true;
            if (gameMode && !isGameEnd)
                updateDataBase({myScore: mode?.maxScore || 10, oppScore: 0});
            socket?.emit("gameEnd", key);
            socket?.disconnect();
        })
    }, [socket])

    useEffect(() => {
        if (gameMode && (score.myScore === mode?.maxScore 
                || score.oppScore === mode?.maxScore )) {
            setIsGameEnd(true);
            socket?.emit("gameEnd", gameKey);
        }

        if (gameMode && score.myScore === mode?.maxScore) {
            isWin.current = true;
            updateDataBase(score);
        }
    }, [score])



    useEffectOnUpdate( () => {
        const newSocket: any = io("ws://localhost:4343");
        setSocket(newSocket);
        setMode(gameModes.get(String(gameMode)));

        void UpdateStatus()

        if (key && gameMode) {
            setIsMatching(true);
            setGameKey(key);

            newSocket.emit("joinGame", key);
            newSocket.emit("waiting", {roomKey, user});

            

            newSocket.on("startGame", (opUser: User) => {
                setIsMatching(false);
                oppUser.current = opUser;
                console.log("start game .....")
            })

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
                setIsMatching(false);
            });
        }

        return () => {;
            newSocket.emit("gameEnd", roomKey);
            newSocket.disconnect();
        };
    }, [])

    const modeName = String(mode?.modeName)
    const backgroundImage = ModeImages.find(mode => mode.includes(modeName))

    return (
        <section className="flex flex-col justify-center items-center w-full h-full">
            <NavLink to={'/'} className="logout absolute cursor-pointer z-50">
                <FaSignOutAlt />
            </NavLink>
            
            <div className='bg absolute w-full h-full top-0' style={{backgroundImage: `url(${backgroundImage})`}}></div>
            <div className='main-container flex flex-col justify-center gap-1'>
                <div onClick={() => setIsClicked(true)} className='w w-12 h-12 bg-red-400 absolute top-20 left-20 uppercase text-center '>{ability[0]}</div>
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
                    setFirstTime={setFirstTime}
                    isClicked={isClicked}
                    setIsClicked={setIsClicked}
                />
            </div>
        </section>
    );
}
