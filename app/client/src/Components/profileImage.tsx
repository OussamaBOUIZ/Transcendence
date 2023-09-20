import UserContext from "../Context/UserContext"
import "../scss/profileImage.scss"
import React, { useContext } from "react"

export default function ProfileImage({image, name, size}: {image: string |undefined, name?: string, size: string}) {
    
    const {navigate} = useContext(UserContext)

    function handleClick() {
        if (name)
            navigate(`/profile/${name}`)
    }

    return (
        <div onClick={handleClick} className={`profileImage ${size}`}>
            <div className="userImage" style={{backgroundImage: `url(${String(image)})`}}></div>
        </div>
    )
}