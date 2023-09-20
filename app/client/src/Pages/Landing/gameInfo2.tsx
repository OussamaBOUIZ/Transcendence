import React from "react";
import rectangle from "../../Assets/Rectangle.svg"
import card2 from "../../Assets/Card-2.svg"

export default function GameInfo2() {
    
    return (
        <div className="gameInfo gameInfo2 h-screen">
            <div className="content h-full flex justify-between items-center px-28 !pr-4">
                <figure className="w-2/5 flex flex-col gap-4">
                    <div className="flex gap-4 items-center font-semibold">
                        <img src={rectangle} alt="" />
                        <h1>Coordinate strategies, share tips and tricks, and stay connected with your gaming squad. </h1>
                    </div>
                    <p>
                    Connect with your friends and challenge them to epic battles in our direct messaging feature.
                    Coordinate strategies, share tips and tricks, and stay connected with your gaming squad.
                    Engage in private conversations, exchange in-game items, and build lasting friendships.
                    Join the vibrant community of passionate gamers in our channel chat feature.
                    Engage in lively discussions, share your achievements, and seek advice from experienced players.
                    Participate in community events, tournaments, and competitions for a chance to win exclusive rewards.
                    Collaborate with fellow gamers, form alliances, and dominate the leaderboards together.
                    </p>
                </figure>
                <img id="table" className="tableIMG" src={card2} alt="" />
                {/*  */}
            </div>
        </div>
    )
}