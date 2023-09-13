import React, { useState } from 'react';
import logo2 from "../Assets/Icons/logo2.png";
import { HiMenu, HiOutlineX } from "react-icons/hi";
import {nanoid} from 'nanoid'
import { Link } from 'react-router-dom';

export default function Header () {

    const [On, setOn] = useState<boolean>(false)

    const navLinks = [
        {id: nanoid(), value: "Home", link: "/"},
        {id: nanoid(), value: "Chat", link: "/chat"},
        {id: nanoid(), value: "Game", link: "/game"},
        {id: nanoid(), value: "Friends", link: "/friends"},
        {id: nanoid(), value: "Settings", link: "/settings"},
        {id: nanoid(), value: "Log out", link: "/logout"},
    ]

    const navLinksToggle = navLinks.map(navLink => {
        return (
            <li className="nav_item my-8" key={navLink.id}>
                <a href={navLink.link} className='nav_link p-3 text-base font-bold rounded-md hover:bg-primary-color'>{navLink.value}</a>
            </li>
        )
    })

    return (
        <div className="header flex justify-between px-4 items-center">
            <Link to={'/'}><img className='h-24' src={logo2} alt="logo" /></Link>
            <HiMenu className="menu sm:hidden w-6 h-6 cursor-pointer" onClick={() => setOn(prev => !prev)}/>
            {
                On &&
                <nav className='nav fixed top-0 right-0 bg-primary-pink w-11/12 h-full p-12 z-50 rounded-bl-full'>
                    {<HiOutlineX className="absolute top-9 right-4 w-6 h-6 cursor-pointer" onClick={() => setOn(prev => !prev)}/>}
                    <ul className='nav_list flex flex-col items-center justify-center gap-8'>
                        {navLinksToggle}
                    </ul>
                </nav>
            }
        </div>
    );
}