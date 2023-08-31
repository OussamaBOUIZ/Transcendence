import "../scss/profileImage.scss"
import React from "react"

export default function ProfileImage({image, size}: {image: string, size: string}) {

    // to be modified using link
    function handleClick() {
        window.location.replace('/profile')
    }
    return (
        <div onClick={handleClick} className={`profileImage ${size}`}>
            <div className="userImage" style={{backgroundImage: `url(${image})`}}></div>
        </div>
    )
}