import React, {useEffect} from "react"
import axios from "axios"
import "../scss/profileImage.scss"
import "../scss/var.scss"

export default function ProfileImage({userData, size}) {
      return (
        <div className={`profileImage ${size}`}>
            <div className="userImage"></div>
        </div>
    )
}