import React, { useContext } from 'react'
import ProfileImage from '../../Components/profileImage'
import {Link} from 'react-router-dom'
import {User} from "../../../global/Interfaces"
import { SocketContext } from './ChatRooms'
import axios from "axios"
import { capitalize } from '../../Helpers/utils'

interface PropType {
    userData: User,
    message?: boolean,
    friend?: boolean,
    add?: boolean
}
export default function UserCard ({userData, message, friend, add}: PropType ) {
    const {roomData, setShowSearch} = useContext(SocketContext)
    
    const handleAddUser = () => {
        const fetch = async () => {
            try {
                await axios.get(`/api/channel/addToChannel/${userData.id}?channelName=${roomData.channelName}`)
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
                    <ProfileImage image={userData.image} name={userData.username} size="regular"/>
                    <div>
                        <h5 className='font-semibold'>{capitalize(userData.firstname)} {capitalize(userData.lastname)}</h5>
                        <p className='text-sm'>{userData.username}</p>
                    </div>
                </div>
            </figcaption>
            <div className='flex justify-between items-center gap-4'>
                    {message && 
                   <Link to={`/chat/${userData.id}`} className='dm-button   bg-primary-pink py-2 px-4 rounded-2xl'>
                        <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/ffffff/filled-chat.png" alt="filled-chat"/>
                    </Link>
                    }
                    {friend && <button className='bg-primary-pink py-2 rounded-2xl px-8'>
                        <img width="30" height="30" src="https://img.icons8.com/pastel-glyph/64/ffffff/add-male-user.png" alt="add-male-user"/>    
                    </button>}
                    {add && <button className='bg-primary-pink py-2 px-4 rounded-2xl' onClick={handleAddUser} >Add</button>}
                </div>
        </figure>
    )
}
