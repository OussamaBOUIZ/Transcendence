import React, {useState} from "react"
import { useEffect } from "react";
import '../scss/Notification.scss'
import { BsFillInfoCircleFill } from "react-icons/bs"

export default function Notification({ message }) {

	const [isAnimationFinished, setIsAnimationFinished] = useState(false)

  useEffect(() => {
    const roundTimeBarDiv = document.querySelector('.round-time-bar div')

    const handleAnimationEnd = () => {
		console.log("YES")
      setIsAnimationFinished(true)
    };

    roundTimeBarDiv.addEventListener('animationend', handleAnimationEnd)

    return () => {
      roundTimeBarDiv.removeEventListener('animationend', handleAnimationEnd)
    };
  }, []);

	return (
		<>
			{!isAnimationFinished && (<div className="NotifContainer">
				<div className="rectangle">
					<div className="notification-text">
						< BsFillInfoCircleFill />
						{message}
					</div>
				</div>
				<div className="round-time-bar" data-style="smooth" style={{ '--duration': 6 }}>
					<div></div>
				</div>
			</div>)}
		</>
	)
}