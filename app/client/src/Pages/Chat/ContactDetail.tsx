import React from 'react'

export default function ContactDetail () {
    return (
        <div className="contact_details_container">
            <h2>Contact details</h2>
            <figure className="contact">
                <img src="../src/Assets/cat.jpg" alt="cat" />
                <figcaption>
                    <h3>Elegant</h3>
                    <h3>Tom</h3>
                    <h6>level 14</h6>
                    <div className="level_bar"></div>
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
                    <img src="../src/Assets/leaf.jpg" alt="" className="achievement-icon" />
                    <figcaption className="achievement-info">
                        <h5 className="achievement-title">Apex Legends</h5>
                        <h6 className="achievement-subtitle">legendary</h6>
                    </figcaption>
                </figure>
                <figure className="achievement">
                    <img src="../src/Assets/leaf.jpg" alt="" className="achievement-icon" />
                    <figcaption className="achievement-info">
                        <h5 className="achievement-title">Apex Legends</h5>
                        <h6 className="achievement-subtitle">legendary</h6>
                    </figcaption>
                </figure>
                <figure className="achievement">
                    <img src="../src/Assets/leaf.jpg" alt="" className="achievement-icon" />
                    <figcaption className="achievement-info">
                        <h5 className="achievement-title">Apex Legends</h5>
                        <h6 className="achievement-subtitle">legendary</h6>
                    </figcaption>
                </figure>
                </div>
                
        </div>
    );
}