import React from 'react'
import "../../scss/utils.scss"

// function UserCard () {

// }

export default function ChatSearchBox () {
    return (
        <section className="search_box">
            <label>Search</label>
            <input type="search" name="" id="" placeholder="Type a username"/>
            <figure className='flex-sp'>
                <figcaption>
                    {/* <img src="./src/Assets/cat.jpg" alt="" /> */}
                    <div>
                    <h5>firstName LastName</h5>
                    <p>username</p>
                    </div>
                </figcaption>
                <div>
                    <button>DM</button>
                    <button>ADD</button>
                </div>
            </figure>
        </section>
    );
}