import React from 'react'

export default function ContactDetail () {
    return (
        <div className="contact_details_container">
            <h2>Contact details</h2>
            <figure className="contact">
                <img src="./src/assets/cat.jpg" alt="cat" />
                <figcaption>
                    <h2>Elegant</h2>
                    <h2>Tom</h2>
                    
                </figcaption>
            </figure>
        </div>
    );
}