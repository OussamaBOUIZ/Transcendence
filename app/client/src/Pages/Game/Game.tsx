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
import HideAbility from "../../Assets/GameArea/HideAbility.png"
import ReverseAbility from "../../Assets/GameArea/ReverseAbility.png"
import SpeedAbility from "../../Assets/GameArea/SpeedAbility.png"
import axios from 'axios';

let ModeImages = [BattleRoyal, BlazingPong, ArcticPong, RetroPong]

let abilityImgs = new Map<string, string>([
    ["reverse", ReverseAbility],
    ["speed", SpeedAbility],
    ["hide", HideAbility],
])

const gameModes = new Map<string, GameMode>([
    ["BattleRoyal", {
        modeName: "BattleRoyal",
        ball: "RoyalBall.png",
        background: "BattleRoyal.jpg",
        paddle: "RoyalPaddle.png",
        color: {r: 239, g: 7, b: 253, a: 1},
        xp: 6000,
        maxScore: 14,
        ability: "none"
    }],
    ["BlazingPong", {
        modeName: "BlazingPong",
        ball: "BlazingBall.png",
        paddle: "BlazingPaddle.png",
        background: "BlazingPong.jpg",
        color: {r: 250, g: 128, b: 8, a: 1},
        xp: 5000,
        maxScore: 11,
        ability: "reverse"
    }],
    ["ArcticPong", {
        modeName: "ArcticPong",
        ball: "ArcticBall.png",
        paddle: "ArcticPaddle.png",
        background: "ArcticPong.jpg",
        color: {r: 135, g: 206, b: 235, a: 1},
        xp: 4000,
        maxScore: 7,
        ability: "speed"
    }],
    ["RetroPong", {
        modeName: "RetroPong",
        ball: "RetroBall.png",
        paddle: "RetroPaddle.png",
        background: "RetroPong.jpg",
        color: {r: 1, g: 248, b: 88, a: 1},
        xp: 3000,
        maxScore: 5,
        ability: "hide"
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
    const isGameEnd = useRef<boolean>(false);
    const { user, navigate } = useContext(UserContext);
    const [ability, setAbility] = useState<string>("");
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const modeName = String(mode?.modeName)
    const backgroundImage = ModeImages.find(mode => mode.includes(modeName))
    const [iconStyle, setIconStyle] = React.useState({animationName: "none"});

    const {key, gameMode} = useParams();

    if (!user.id) navigate('/error', { state: { statusCode: 404, statusText: "Not Found" } });

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

    // const UpdateStatus = async () => {
    //     try {
    //         void axios.put('/api/user/updateStatus', {status: "In A Game"})
    //     }
    //     catch (error) {}
    // }

    useEffect(() => {
        setAbility(mode?.ability || "")
    }, [mode])

    const handleVisibilityChange = function() {
        if (document.visibilityState !== 'visible') {
            isGameEnd.current = true;
            socket?.emit("quitGame", roomKey);
        }
    }

    

    useEffectOnUpdate(()  => {
        document.addEventListener("keydown", function(event) {
            if (event.code === "Space" || event.keyCode === 32) {
                setIconStyle({animationName: "none"});
            }
        });

        document.addEventListener("visibilitychange", handleVisibilityChange);
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
            setIconStyle({animationName: "brilliance"})
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
        });

        socket?.on("leaveGame", () => {

            isWin.current = true;

            if (gameMode && !isGameEnd.current) {
                updateDataBase({myScore: mode?.maxScore || 10, oppScore: 0});
            }
            isGameEnd.current = true;
            socket?.emit("gameEnd", key);
        });
    }, [socket])

    useEffect(() => {
        if (gameMode && (score.myScore === mode?.maxScore
                || score.oppScore === mode?.maxScore )) {
            

            if (!isGameEnd.current && score.myScore === mode?.maxScore) {
                isWin.current = true;
                updateDataBase(score);
            }

            isGameEnd.current = true;
            socket?.emit("gameEnd", gameKey);
        }

    }, [score])

    useEffectOnUpdate( () => {
        const newSocket: any = io("ws://localhost:4343");
        setSocket(newSocket);
        setMode(gameModes.get(String(gameMode)));

        if (key && gameMode) {
            setIsMatching(true);
            setGameKey(key);
            roomKey = key;

            newSocket.emit("joinGame", key);
            newSocket.emit("waiting", key);

            newSocket.on("startGame", () => {
                setIsMatching(false);
                newSocket.emit("sendUser", {roomKey: key, user});
                newSocket.on("recvOppUser", (opUser: User) => {
                    oppUser.current = opUser;
                })

            })

        } else if (gameMode) {
            setIsMatching(true);
            newSocket.emit("gameMatching", {
                modeName: gameModes.get(gameMode)?.modeName,
                xp: mode?.xp,
                user: user,
            });

            newSocket.on("matched", (data: any) => {
                setGameKey(data.roomKey);
                roomKey = data.roomKey;
                newSocket.emit("joinGame", data.roomKey);
                oppUser.current = data.user;
                setIsMatching(false);
            });
        }

        return () => {
            newSocket.emit("quitGame", roomKey);
            newSocket.disconnect();
        };
    }, [])

    const  handleClick = () => {
        if (isEffect.current) {
            setIsClicked(true);
            setIconStyle({animationName: "none"});
        }
    }

    return (
        <section className="flex flex-col justify-center items-center w-full h-full">
            <NavLink to={'/'} className="logout absolute cursor-pointer z-50">
                <FaSignOutAlt />
            </NavLink>
            <div className='bg absolute w-full h-full top-0' style={{backgroundImage: `url(${backgroundImage})`}}></div>
            <div className='main-container flex flex-col items-center justify-center gap-1'>
                {!isMatching && <img
                    onClick={handleClick}
                    style={iconStyle}
                    id="ability-icon"
                    src={abilityImgs.get(ability)}
                    className={`bg-purple-400 rounded-full ${isHost && "ability-position-modifier"}`} />
                }
                {!isMatching && <Board
                    score={score}
                    oppUser={oppUser.current}
                    isHost={isHost}
                    persentage={persentage}/>
                }

                <ReactP5Wrapper 
                    user={user}
                    sketch={sketch}
                    socket={socket}
                    isHost={isHost}
                    setIsHost={setIsHost}
                    gameKey={gameKey}
                    gameMode={mode}
                    isMatching={isMatching}
                    score={score}
                    setScore={setScore}
                    isGameEnd={isGameEnd}
                    isWin={isWin}
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
