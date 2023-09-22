import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Battles() {

    const battles = [
        {id: 'BlazingPong', link: '/game/BlazingPong', style: 'text-2xl sm:text-3xl md:text-2xl lg:text-3xl', value: 'Blazing Pong'},
        {id: 'ArcticPong', link: '/game/ArcticPong', style: 'text-2xl sm:text-3xl md:text-2xl lg:text-3xl', value: 'Arctic Pong'},
        {id: 'RetroPong', link: '/game/RetroPong', style: 'text-2xl sm:text-3xl md:text-2xl lg:text-3xl', value: 'Retro Pong'},
    ]

    const battlesElements = battles.map(battle => {
        return (
            <NavLink key={battle.id} to={battle.link} className={`item ${battle.id}`}>
                <span className={battle.style}>{battle.value}</span>
            </NavLink>
        )
    })
    return (
        <>
            <div className="item battleRoyal">
                <div className='box absolute top-0 w-4/5 h-full'></div>
                <div className="BattleRoyalCover w-3/4" >
                    <span className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl">Battle Royal</span>
                    <p className="mt-0 font-light sm:text-xs md:text-base lg:text-lg">Play the game and get extra coins in our Battle Royal</p>
                    <NavLink to="/game/BattleRoyal"><button className='PlayButton px-14 py-2 lg:px-16 lg:py-2 md:px-14 md:py-2' ><span>Play</span></button></NavLink>
                </div>
            </div>
            {battlesElements}
        </>
    )
}