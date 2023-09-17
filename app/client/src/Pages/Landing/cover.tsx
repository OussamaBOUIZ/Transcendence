import React from "react";
import { Link } from "react-router-dom";
import logo2 from '../../Assets/Icons/logo2.png'

export default function Cover() {

    const navLinks = [
        { link: '', value: 'Home' },
        { link: '#gameInfo', value: 'Game' },
        { link: '#about', value: 'About' },
        { link: '#team', value: 'Team' }
    ]

    const Links = navLinks.map((navLink) => {
        return (
            <a
                href={navLink.link}
                key={navLink.value}
                className='w-24 cursor-pointer z-10'
            >
                {navLink.value}
            </a>
        )
    })
    

    return (
        <div id="home" className="cover flex flex-col w-full h-screen relative">
            <header className="absolute left-0 w-full flex justify-between items-center">
                <Link to='/'><img className='h-24' src={logo2} alt="logo" /></Link>
                <nav>
                    <ul className="flex">{Links}</ul>
                </nav>
            </header>
            <section className="h-full flex justify-center items-center relative">
                <div className="shadow absolute"></div>
                <div className="content text-center flex flex-col justify-center items-center gap-8 px-11 lg:px-16 xl:px-28 z-10">
                    <h1 className="">Elevate Your Ping Pong Game:<br></br>Master the Art of Digital Table Tennis like Never Before!</h1>
                    <p>Get Ready for Next-Level Ping Pong: Embark on an Exciting Journey in the Virtual Arena! Connect, Compete, and Spectate: Experience the Ultimate Digital Ping Pong Adventure with Friends</p>
                    <Link to='/sign' className="button">Get Started</Link>
                </div>
            </section>
        </div>
    )
}