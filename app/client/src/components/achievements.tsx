import React, {useEffect} from "react"
import axios from "axios"
import "../scss/achievements.scss"
import Achieve from "../Assets/Isometric_Fantasy_3d_vray_render_antiquities_black_statue_liqu_2.jpeg"
import lock from "../Assets/Icons/lock-solid.svg"
import unlock from "../Assets/Icons/lock-open-solid.svg"

export default function Achievements({ userData }) {
    const isAchieved = true
      return (
        <figure className="achievement">
            <img src={Achieve} alt="" className="achievement-icon" />
            <figcaption className="achievement-info">
                <h5 className="achievement-title">Pong member</h5>
                <h6 className="achievement-desc">Become part of our game</h6>
            </figcaption>
            <div className="isAchieved">
                {!isAchieved ? <p>locked</p> : <p>unlocked</p>}
                {!isAchieved ? <img src={lock} /> : <img src={unlock} />}
            </div>
        </figure>
    )
}