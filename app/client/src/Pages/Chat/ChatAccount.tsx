import React, {useContext} from 'react'
import ProfileImage from '../../Components/profileImage';
import UserContext from '../../Context/UserContext';
import { capitalize } from '../../Helpers/utils';

export default function ChatAccount () {
    const {user, show} = useContext(UserContext)

    return (
        <section className={`chat_account flex ${show === 'inbox' ? 'on' : 'off'}`}>
            <ProfileImage image={user.image} name={user.username} size="medium" />
            <figcaption>
                <p className="account_name">{capitalize(user?.firstname)}</p>
                <p className="account_name">{capitalize(user?.lastname)}</p>
                <p className="my_account">My Account</p>
            </figcaption>
        </section>
    );
}