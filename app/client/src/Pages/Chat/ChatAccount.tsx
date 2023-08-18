import React, {useContext} from 'react'
import ProfileImage from '../../Components/profileImage';
import UserContext from '../../Context/UserContext';

export default function ChatAccount () {
    const {user} = useContext(UserContext)
    return (
        <section className="chat_account">
            <ProfileImage image={user?.image} size="small" />
            <figcaption>
                <p className="account_name">{user?.firstname}</p>
                <p className="my_account">My Account</p>
            </figcaption>
        </section>
    );
}