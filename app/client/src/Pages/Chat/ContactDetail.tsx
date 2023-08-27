import React, {useEffect} from 'react'
import axios from  'axios'
import { PlayerData, StatAchievement } from '../../../../global/Interfaces';
import Achievements from '../../Components/achievements';
import { isHtmlElement } from '../../../../../node_modules/react-router-dom/dist/dom';
import { getUserImage } from '../../Hooks/getUserImage';
import { getAchievementImage } from '../../Hooks/getAchievementImage';

export default function ContactDetail ({id}) {
    const [userOverview, setUserOverview] = React.useState<PlayerData>({} as PlayerData);

     const getUserOverview = async () => {
        try {
            const res = await axios.get(`../api/user/user/details/${id}`)
            setUserOverview(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserOverview()
    })


    const AchievementsElements = userOverview.stat.achievements.map((item:StatAchievement) => {
        const achImg = getAchievementImage(item.id)
        return (
            <figure className="achievement">
                <img src={achImg} alt="" className="achievement-icon" />
                <figcaption className="achievement-info">
                    <h5 className="achievement-title">{item.badge_name}</h5>
                    <h6 className="achievement-subtitle">{item.description}</h6>
                </figcaption>
            </figure>
        )
    })

    return (
        <div className="contact_details_container">
            <h2>Contact details</h2>
            <figure className="contact">
                <img src="../src/Assets/cat.jpg" alt="cat" />
                <figcaption>
                    <h3>{userOverview.firstname}</h3>
                    <h3>{userOverview.lastname}</h3>
                    <h6>{userOverview.stat.ladder_level}</h6>
                    <div className="level_bar"></div>
                </figcaption>
            </figure>
                <div className="results">
                    <figcaption className="results-item">
                        <p>Games</p>
                        <h5>{userOverview.wins + userOverview.losses}</h5>
                    </figcaption>
                    <figcaption className="results-item">
                        <p>Wins</p>
                        <h5>{userOverview.wins}</h5>
                    </figcaption>
                    <figcaption className="results-item">
                        <p>Losses</p>
                        <h5>{userOverview.losses}</h5>
                    </figcaption>
                </div>
                <h2>Achievements</h2>
                <div className="achievement-container">
                    {AchievementsElements}
                </div>
                
        </div>
    );
}