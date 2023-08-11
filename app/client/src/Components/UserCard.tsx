import React from 'react'
import ProfileImage from './profileImage'



export default function UserCard ({firstname, lastname, username, avatar}) {
    return (
        <figure className='flex-sp'>
                <figcaption>
                    <div>
                        <ProfileImage image={avatar} size="small"/>
                        <h5>{firstname} {lastname}</h5>
                        <p>{username}</p>
                    </div>
                </figcaption>
                <div>
                    <button>DM</button>
                    <button>ADD</button>
                </div>
            </figure>
    )
}
