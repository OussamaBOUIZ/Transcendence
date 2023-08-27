import React, { useContext } from 'react'
import ProfileImage from '../../Components/profileImage'
import {Link} from 'react-router-dom'
import {User} from "../../../../global/Interfaces"
import { SocketContext } from './ChatRooms'
import axios from "axios"


export default function UserCard ({user, message, friend, add}: {user: User | null, message: boolean, friend: boolean, add: boolean}) {
    const {roomData, setShowSearch} = useContext(SocketContext)

    const handleAddUser = () => {
        const fetch = async () => {
            try {
                await axios.get(`/api/channel/addToChannel/${user.id}?channelName=${roomData.channelName}`)
                setShowSearch(prev => !prev)
            }
            catch (err) {
                // console.log(err)
            }      
        }
        void fetch();
    }

     return (
        <figure className='flex justify-between items-center bg-violet-900 rounded-md m-2 p-2'>
                <figcaption>
                    <div className='flex gap-6'>
                        <ProfileImage image={user.image} size="small"/>
                        <div>
                            <h5>{user.firstname} {user.lastname}</h5>
                            <p>{user.username}</p>
                        </div>
                    </div>
                </figcaption>
                <div>
                    {message && <Link to={`/chat/${user.id}`}>DM</Link>}
                    {friend && <button className='bg-primary-pink py-2 px-4 rounded-2xl'>Add</button>}
                    {add && <button className='bg-primary-pink py-2 px-4 rounded-2xl' onClick={handleAddUser} >Add</button>}
                </div>
            </figure>
    )
}

// figure {
//     margin-top: .5em;
//     button {
//         background-color: $primary-pink;
//         padding: .4em;
//         margin: 1em;
//     }
// }