import "../scss/profileImage.scss"
import React from "react"

export default function ProfileImage({image, name, size}: {image: string |undefined, name?: string, size: string}) {
    
    function handleClick() {
        if (name)
            window.location.href = `/profile/${name}`
    }

    return (
        <div onClick={handleClick} className={`profileImage ${size}`}>
            <div className="userImage" style={{backgroundImage: `url(${String(image)})`}}></div>
        </div>
    )
}