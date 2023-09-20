import React, { useContext, useEffect, useRef } from "react"
import '../scss/Notification.scss'
import { BsFillInfoCircleFill } from "react-icons/bs"
import UserContext from "../Context/UserContext";
import ProfileImage from "./profileImage";
import { Link } from "react-router-dom";

interface userType {
	username: string;
	image: string;
	gameName: string;
}

export default function Notification({ message, playNow }: {message?: string, playNow?: userType}) {

	const {isAnimationFinished, setIsAnimationFinished} = useContext(UserContext)
	const outerDivRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if(outerDivRef.current)
			outerDivRef.current.style.setProperty('--duration', '6');
		const roundTimeBarDiv = document.querySelector('.round-time-bar div')
		roundTimeBarDiv?.addEventListener('animationend', () => setIsAnimationFinished(true))

		return () => {
			roundTimeBarDiv?.removeEventListener('animationend', () => setIsAnimationFinished(true))
		};
	}, []);

	const popUp = <div className="notification-text">
					<BsFillInfoCircleFill />
					<p>{message}</p>
				</div>

	const invitation = <div className="flex w-full items-center justify-between">
		<figure className="flex items-center justify-center gap-2">
			<ProfileImage image={playNow?.image} name={playNow?.username} size="small" />
			<div className="flex flex-col">
				<p>{playNow?.username}</p>
				<p className="text-xs opacity-80 font-normal">{`${playNow?.gameName} challenge!`}</p>
			</div>
		</figure>
		<Link to="/game/BattleRoyal"><button className='PlayButton shadow-md px-4 py-1'><span>Play</span></button></Link>
	</div>;
	const Content = (message) ? popUp : invitation

	return (
		<>
			{!isAnimationFinished && (<div className="NotifContainer">
				<div className="rectangle">{Content}</div>
				<div ref={outerDivRef}className='round-time-bar' data-style="smooth">
					<div></div>
				</div>
			</div>)}
		</>
	)
}