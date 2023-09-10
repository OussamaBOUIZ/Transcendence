import React from 'react'
import "../../scss/Game.scss"
import Board from './Board';
import {FaSignOutAlt} from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import img from "../../Assets/BrightGround.jpeg"
import img2 from "../../Assets/DreamShaper_32_young_man_character_playing_ping_pong_full_body_2.jpeg"

export default function Game() {

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
                <Board />
                <div className='table z-50'></div>
            </div>
        </section>
    );
}