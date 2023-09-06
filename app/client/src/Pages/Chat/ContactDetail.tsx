import React from 'react'
import { User, Achievement } from '../../../../global/Interfaces';

function AllAchievement ({item} :{item: Achievement}) {
    return (
        <figure className="achievement">
            <img src={item.image} alt="" className="achievement-icon" />
            <figcaption className="achievement-info">
                <h5 className="achievement-title">{item?.badge_name}</h5>
                <h6 className="achievement-subtitle">{item?.description}</h6>
            </figcaption>
        </figure>
    )
}

export default function ContactDetail ({oview} : {oview: User}) {
    
    const AchievementsElements = oview?.stat?.achievements?.map((item) => <AllAchievement key={item.id} item={item} />)

    return (
        // <div className="chat_overview">
            <div className="contact_details_container">
            <h2>Contact details</h2>
            <figure className="contact">
                {/* <img src="../src/Assets/cat.jpg" alt="cat" /> */}
                <img src={oview?.image} alt="cat" />
                <figcaption>
                    <h3>{oview?.firstname}</h3>
                    <h3>{oview?.lastname}</h3>
                    <h6>{oview?.stat?.ladder_level}</h6>
                    <div className="level_bar"></div>
                </figcaption>
            </figure>
                <div className="results">
                    <figcaption className="results-item">
                        <p>Games</p>
                        <h5>{oview?.stat?.wins! + oview?.stat?.losses!}</h5>
                    </figcaption>
                    <figcaption className="results-item">
                        <p>Wins</p>
                        <h5>{oview?.stat?.wins!}</h5>
                    </figcaption>
                    <figcaption className="results-item">
                        <p>Losses</p>
                        <h5>{oview?.stat?.losses!}</h5>
                    </figcaption>
                </div>
                <h2>Achievements</h2>
                <div className="achievement-container">
                    {AchievementsElements}
                </div>
        </div>  
        // </div>
    );
}
