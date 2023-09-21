import React, { useContext, useState } from 'react'
import Avatar from '../../Components/Avatar';
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';
import axios from 'axios';
import { getUserImage } from '../../Hooks/getUserImage';
import UserContext from '../../Context/UserContext';


interface OnlineUsers {
    id: number;
    status: string;
    username: string;
    image?: string;
}


export default function OnlineNow () {

    const [users, setUsers] = useState<OnlineUsers[]>([])
    const {show} = useContext(UserContext)

    useEffectOnUpdate(() => {
        const fetchOnlineUsers =async () => {
            try {
                const res = await axios.get<OnlineUsers[]>('/api/user/online/users');
                const data = await Promise.all(
                    res.data.map(async (item) => {
                        const image = await getUserImage(item.id)
                        return {...item, image}
                    }))
                setUsers(data)
            }
            catch (err) {}
        }
        void fetchOnlineUsers();
    }, [])

    const toggle = users.map(user => {
        return (
            <Avatar key={user.id} username={user.username} status={user.status} imgSource={String(user.image)}/>
        )
    })

    return (
        <section className={`online_now ${show === 'inbox' ? 'on' : 'off'}`}>
            <h3>Online now</h3>
            <div className="flex mx-4 my-2 overflow-hidden">
                {
                    users.length === 0 
                    ?
                    <p className='text-xs text-center text-gray-400'>Here's where your online friend will light up</p>
                    :
                    <div className='flex overflow-x-auto gap-x-2'>{toggle}</div>
                }
                
            </div>
        </section>
    );
}