import React from 'react'
import ProfileImage from '../../Components/profileImage'
import {Link} from 'react-router-dom'

interface PropType {
    firstname: string;
    lastname: string;
    username: string;
    avatar: string;
    id: string;

}

export default function UserCard ({firstname, lastname, username, avatar, id}: PropType) {
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
                    <Link to={`/chat/${id}`}>DM</Link>
                    <button>ADD</button>
                </div>
            </figure>
    )
}
