import React, { useState } from 'react';
import logo2 from "../Assets/Icons/logo2.png";
import { HiMenu, HiOutlineX } from "react-icons/hi";

export default function Header () {

    const [On, setOn] = useState<boolean>(false)
    return (
        <div className="header flex justify-between px-4 items-center">
            <img className='h-24' src={logo2} alt="logo" />
            <HiMenu className="menu sm:hidden w-6 h-6 cursor-pointer" onClick={() => setOn(prev => !prev)}/>
            {
                On &&
                <nav className='nav fixed top-0 right-0 bg-primary-pink w-full h-full p-12 z-50 rounded-bl-full'>
                    {<HiOutlineX className="absolute top-9 right-4 w-6 h-6 cursor-pointer" onClick={() => setOn(prev => !prev)}/>}
                    <ul className='nav_list flex flex-col items-center justify-center gap-8'>
                        <li className="nav_item my-8"><a href='/' className='nav_link p-3 text-base font-bold rounded-md hover:bg-primary-color'>Home</a></li>
                        <li className="nav_item my-8"><a href='/chat' className='nav_link p-3 text-base font-bold rounded-md hover:bg-primary-color'>Chat</a></li>
                        <li className="nav_item my-8"><a href='/game' className='nav_link p-3 text-base font-bold rounded-md hover:bg-primary-color'>Game</a></li>
                        <li className="nav_item my-8"><a href='/friends' className='nav_link p-3 text-base font-bold rounded-md hover:bg-primary-color'>Friends</a></li>
                        <li className="nav_item my-8"><a href='/settings' className='nav_link p-3 text-base font-bold rounded-md hover:bg-primary-color'>Settings</a></li>
                        <li className="nav_item my-8"><a href='/logout' className='nav_link p-3 text-base font-bold rounded-md hover:bg-primary-color'>Log out</a></li>
                    </ul>
                </nav>
            }
        </div>
    );
}