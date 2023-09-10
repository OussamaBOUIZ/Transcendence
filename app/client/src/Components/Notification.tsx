import React, { useEffect, useContext, useRef } from "react"
import '../scss/Notification.scss'
import { BsFillInfoCircleFill } from "react-icons/bs"
import UserContext from "../Context/UserContext";

export default function Notification({ message }: {message: string}) {

	const {isAnimationFinished, setIsAnimationFinished} = useContext(UserContext)
	const outerDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
	if(outerDivRef.current)
		outerDivRef.current.style.setProperty('--duration', '6');
    const roundTimeBarDiv = document.querySelector('.round-time-bar div')

    const handleAnimationEnd = () => {
      setIsAnimationFinished(true)
    };

    roundTimeBarDiv?.addEventListener('animationend', handleAnimationEnd)

    return () => {
      roundTimeBarDiv?.removeEventListener('animationend', handleAnimationEnd)
    };
  }, []);

	return (
		<>
			{!isAnimationFinished && (<div className="NotifContainer">
				<div className="rectangle">
				<div className="notification-text">
					<BsFillInfoCircleFill />
					{
						message.length === 1 ?
						(<p>{message}</p>) :
						(<p>Form is incorrect</p>)
					}
					</div>
				</div>
				<div ref={outerDivRef}className="round-time-bar" data-style="smooth">
					<div></div>
				</div>
			</div>)}
		</>
	)
}