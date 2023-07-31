import "../scss/userOverview.scss";
import Achieve from "../Assets/Isometric_Fantasy_3d_vray_render_antiquities_black_statue_liqu_2.jpeg"
import ProfileImage from './profileImage';
import { getStats } from "../hooks/getStats";

export default function UserOverview ({UserData}) {
    console.log(UserData)
    // const { Stats } = getStats(UserData);
    // console.log(Stats)

    const level = 70
    return (
        <div className="user_overview">
            <div className="contact_details_container">
                <h2>My profile</h2>
                <figure className="contact">
                    <ProfileImage userData="" size="big" />
                    <figcaption>
                        <span>{UserData?.firstname}</span>
                        <span>{UserData?.lastname}</span>
                        <p>level 14</p>
                        <div className="level_bar">
                            <div className="level-bar-fill" style={{ width: `${level}%` }}></div>
                        </div>
                    </figcaption>
                </figure>
                    <div className="results">
                        <figcaption className="results-item">
                            <p>Games</p>
                            <h5>32</h5>
                        </figcaption>
                        <figcaption className="results-item">
                            <p>Wins</p>
                            <h5>56</h5>
                        </figcaption>
                        <figcaption className="results-item">
                            <p>Losses</p>
                            <h5>1</h5>
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