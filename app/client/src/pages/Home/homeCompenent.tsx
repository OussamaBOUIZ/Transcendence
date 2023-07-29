import React from 'react';
import {useState, useEffect} from "react";
import Character from "../../Assets/character.png"
import ButtonPlay from '../../components/ButtonPlay'
import RankContent from "../../components/rankContent"
import ContentBar from "../../components/contentBar"
import History from "../../components/history";
import "../../scss/homeCompenent.scss";


export default function HomeCompenent() {
        // let UserData:
        const [UserData, setUserData] = useState({
            id: 0,
            firstname: "",
            lastname: "",
            username: "oouazize"
        })
    
        useEffect(() => {
            const getUserData = async () => {
                try {
                    const response = await axios.get("/api/auth/getuser");
                    setUserData(response.data);
                }
                catch (error) {
                    console.log(error)
                }
    
            }
            getUserData()
        }, [])


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
                            <RankContent size="medium" />
                        </div>
                        <div className="rank rank1">
                            <RankContent size="medium"/>
                        </div>
                        <div className="rank rank3">
                            <RankContent size="medium" />
                        </div>
                    </div>
                </div>
                <div className="item GameHistory">
                    <p>Game History</p>
                    <div className="games">
                        <ContentBar content={<History />} />
                        <ContentBar content={<History />} />
                        <ContentBar content={<History />} />
                        {/* <ContentBar content={<History />} /> */}
                    </div>
                </div>
            </div>
        </>
    )
}