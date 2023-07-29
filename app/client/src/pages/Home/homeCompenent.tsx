import React from 'react';
import {useState, useEffect} from "react";
import axios from 'axios';
import Character from "../../Assets/character.png"
import ButtonPlay from '../../components/ButtonPlay'
import RankContent from "../../components/rankContent"
import ContentBar from "../../components/contentBar"
import History from "../../components/history";
import "../../scss/homeCompenent.scss";
import { getLeaders } from "../../hooks/getLeaders"


export default function HomeCompenent({ UserData }) {
        const { leaders } = getLeaders();

    return (
        <>
            <div className="backgroundHomeShadow"></div>
            <div className="leaderboardShadow"></div>
            <div className="homeCompenent">
                <div className="item battleRoyal">
                    <div className="BattleRoyalCover" >
                        <span>Battle Royal</span>
                        <p>Play the game and get extra coins in our Battle Royal</p>
                        {/* <ButtonPlay content="Play" /> */}
                        <button className='PlayButton' ><span>Play</span></button>
                    </div>
                    <img src={Character} alt="" />

                </div>
                <div className="item theBeast">
                    <span>TheBeast</span>
                </div>
                <div className="item SpiderGround">
                    <span>SpiderGround</span>
                </div>
                <div className="item BrightGround">
                    <span>BrightGround</span>
                </div>
                <div className="item Leaderboard">
                    <p>Leaderboard</p>
                    <div className="board">
                        <div className="rank rank2">
                            {/* <RankContent size="medium" /> */}
                            <RankContent userData={leaders[1]} size="medium" Rank={2} />
                        </div>
                        <div className="rank rank1">
                            {/* <RankContent size="medium" /> */}
                            <RankContent userData={leaders[0]} size="medium" Rank={1} />
                        </div>
                        <div className="rank rank3">
                            {/* <RankContent size="medium" /> */}
                            <RankContent userData={leaders[2]} size="medium" Rank={3} />
                        </div>
                    </div>
                </div>
                <div className="item GameHistory">
                    <p>Game History</p>
                    <div className="games">
                        <ContentBar content={<History userData={UserData}/>} />
                        <ContentBar content={<History userData={UserData}/>} />
                        <ContentBar content={<History userData={UserData}/>} />
                    </div>
                </div>
            </div>
        </>
    )
}