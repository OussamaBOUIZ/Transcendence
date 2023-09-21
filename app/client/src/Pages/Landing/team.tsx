import React from "react";
import { Link } from "react-router-dom";
import github from "../../Assets/Icons/github.png";
import linkedin from "../../Assets/Icons/linkedin.png";
import ouazize from "../../Assets/ouazize.jpeg";
import obouizga from "../../Assets/obouizga.jpeg";
import abde from "../../Assets/abde.jpeg";
import dib from "../../Assets/dib.jpeg";
import ijmari from "../../Assets/ijmari.jpg";
/**
 * 
 * 
 * 
 * 
 * 
 * 

 */

export default function Team() {
    const navLinks = [
        {linkedin: 'https://www.linkedin.com/in/oussama-ouazize/', github: 'https://github.com/oouazize', image: ouazize},
        {linkedin: 'https://www.linkedin.com/in/obouizga/', github: 'https://github.com/OussamaBOUIZ', image: obouizga},
        {linkedin: 'https://www.linkedin.com/in/abdelhak-el-moussaoui-b7956b194/', github: 'https://github.com/abdelhak4', image: abde},
        {linkedin: 'https://www.linkedin.com/in/issam-jmari-95a217258/', github: 'https://github.com/issamjmari', image: ijmari},
        {linkedin: 'https://www.linkedin.com/in/yassineeddyb/', github: 'https://github.com/YassineEddyb', image: dib},
    ]

    const team = navLinks.map(item => {
        return (
            <div key={item.github} className="team-member flex flex-col gap-8 item-center">
                <div className="photo relative  w-32 h-32">
                    <img className="relative rounded-full w-full h-full z-10" src={item.image} alt="" />
                    <svg className="absolute -top-2 -left-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170" fill="none">
                        <circle cx="85" cy="85" r="83" stroke="white" strokeWidth="3"/>
                    </svg>
                </div>
                <div className="flex gap-4 justify-center">
                    <Link target="_blank" to={item.github} ><img className="h-8" src={github} alt="" /></Link>
                    <Link target="_blank" to={item.linkedin} ><img className="h-8" src={linkedin} alt="" /></Link>
                </div>
            </div>
        )
    })

    return (
        <div id="team" className="team h-screen">
            <section className="h-full flex flex-col justify-evenly items-center">
                <header className="font font-semibold text-3xl">Meet Our Brilliant Team Behind the Game Web Application</header>
                <figure className="flex gap-4 flex-wrap w-full items-center justify-evenly">
                    {team}
                </figure>
            </section>
        </div>
    )
}