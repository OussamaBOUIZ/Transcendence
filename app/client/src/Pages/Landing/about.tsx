import React from "react";
import { Link } from "react-router-dom";
import jira from "../../Assets/Icons/jira.png"
import docker from "../../Assets/Icons/Docker.png"
import nest from "../../Assets/Icons/logo-small.svg"
import postgres from "../../Assets/Icons/Postgresql_elephant.svg.png"
import react from "../../Assets/Icons/React-icon.svg.png"
import figma from "../../Assets/Icons/figma.png"
import typeScript from '../../Assets/Icons/TS.png'
import sass from '../../Assets/Icons/sass.png'
import nodeJS from '../../Assets/Icons/nodejs.png'
import tailwind from '../../Assets/Icons/tailwind.png'
import p5 from '../../Assets/Icons/p5.png'


export default function About() {

    const navLinks = [
        {link: 'https://react.dev/', value: react},
        {link: 'https://www.docker.com/', value: docker},
        {link: 'https://nestjs.com/', value: nest},
        {link: 'https://www.postgresql.org/', value: postgres},
        {link: 'https://www.typescriptlang.org/', value: typeScript},
        {link: 'https://sass-lang.com/', value: sass},
    ]
    
    const navLinks2 = [
        {link: 'https://p5js.org/', value: p5},
        {link: 'https://nodejs.org/', value: nodeJS},
        {link: 'https://tailwindcss.com/', value: tailwind},
        {link: 'https://www.atlassian.com/software/jira', value: jira},
        {link: 'https://www.figma.com/', value: figma},
    ]

    const tech = navLinks.map(item => {
        return <Link key={item.value} target="_blank" to={item.link} ><img className="h-20" src={item.value} alt="" /></Link>
    })

    const tech2 = navLinks2.map(item => {
        return <Link key={item.value} target="_blank" to={item.link} ><img className="h-20" src={item.value} alt="" /></Link>
    })


    return (
        <div id="about" className="tech h-screen bg-black">
            <section className="h-full flex flex-col justify-evenly items-center">
                <header className="font font-semibold text-3xl">Revolutionary Technologies Powering Our Game Web Application</header>
                <figure className="flex flex-col gap-16 w-full items-center">
                    <div className="flex flex-wrap gap-4 w-full justify-between">{tech}</div>
                    <div className="flex flex-wrap gap-4 w-full justify-evenly">{tech2}</div>
                </figure>
            </section>
        </div>
    )
}