import React, { useContext } from 'react'
import ProfileImage from '../../Components/profileImage'
import {Link} from 'react-router-dom'
import {User} from "../../../../global/Interfaces"
import { SocketContext } from './ChatRooms'
import axios from "axios"
import AddUser from "../../Assets/Icons/addUser.svg"
import UserContext from '../../Context/UserContext'

interface PropType {
    userData: User,
    message?: boolean,
    friend?: boolean,
    add?: boolean
}
export default function UserCard ({userData, message, friend, add}: PropType ) {
    const {roomData, setShowSearch} = useContext(SocketContext)
    const {user} = useContext(UserContext)

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

    async function handleFriend() {
        try {
            await axios.post(`/api/user/addfriend/${user.id}?friendId=${userData.id}`, null)
        }
        catch (err) {
            // console.log(err)
        }
    }

    return (
        <figure className='flex justify-between items-center bg-violet-900 rounded-md m-2 p-2'>
            <figcaption>
                <div className='flex gap-6'>
                    <ProfileImage image={userData.image} name={userData.username} size="small"/>
                    <div>
                        <h5>{userData.firstname} {userData.lastname}</h5>
                        <p>{userData.username}</p>
                    </div>
                </div>
            </figcaption>
            <div className='flex gap-4'>
                {message && <Link to={`/chat/${userData.id}`}><button className='bg-primary-pink px-2 py-1 rounded-2xl'>DM</button></Link>}
                {friend && <img className="cursor-pointer" onClick={handleFriend} src={AddUser} alt="" />}
                {add && <img className="cursor-pointer" onClick={handleAddUser} src={AddUser} alt="" />}
            </div>
        </figure>
    )
}
