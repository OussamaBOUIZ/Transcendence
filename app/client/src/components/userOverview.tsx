import React from 'react'
import "../scss/userOverview.scss";
import profileLogo from "../Assets/DreamShaper_32_young_pale_skinny_white_man_white_and_blue_hair_1.jpeg"
import Achieve from "../Assets/Isometric_Fantasy_3d_vray_render_antiquities_black_statue_liqu_2.jpeg"
import ProfileImage from './profileImage';
import ContentBar from './contentBar';
import Achievements from './achievements';

export default function UserOverview () {

    const level = 70
    return (
        <div className="user_overview">
            <div className="contact_details_container">
                <h2>My profile</h2>
                <figure className="contact">
                    <ProfileImage userData="" size="big" />
                    <figcaption>
                        <span>Oussama</span>
                        <span>Ouazize</span>
                        <p>level 14</p>
                        <div className="level_bar">
                            <div className="level-bar-fill" style={{ width: `${level}%` }}></div>
                        </div>
                    </figcaption>
                </figure>
                    <div className="results">
                        <figcaption className="results-item">
                            <p>Games</p>
                            <h5>45</h5>
                        </figcaption>
                        <figcaption className="results-item">
                            <p>Wins</p>
                            <h5>29</h5>
                        </figcaption>
                        <figcaption className="results-item">
                            <p>Losses</p>
                            <h5>16</h5>
                        </figcaption>
                    </div>
                    <h2>Achievements</h2>
                    <div className="achievement-container">
                    <figure className="achievement">
                        <img src={Achieve} alt="" className="achievement-icon" />
                        <figcaption className="achievement-info">
                            <h5 className="achievement-title">Apex Legends</h5>
                            <h6 className="achievement-subtitle">legendary</h6>
                        </figcaption>
                    </figure>
                    <figure className="achievement">
                        <img src={Achieve} alt="" className="achievement-icon" />
                        <figcaption className="achievement-info">
                            <h5 className="achievement-title">Apex Legends</h5>
                            <h6 className="achievement-subtitle">legendary</h6>
                        </figcaption>
                    </figure>
                    <figure className="achievement">
                        <img src={Achieve} alt="" className="achievement-icon" />
                        <figcaption className="achievement-info">
                            <h5 className="achievement-title">Apex Legends</h5>
                            <h6 className="achievement-subtitle">legendary</h6>
                        </figcaption>
                    </figure>
                    </div>
            </div>
        </div>
    );
}