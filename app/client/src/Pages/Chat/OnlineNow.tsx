import React, { useContext, useState } from 'react'
import { InboxItem } from '../../../../global/Interfaces';
import Avatar from '../../Components/Avatar';
import InboxContext from '../../Context/InboxContext';
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';
import axios from 'axios';
import { getUserImage } from '../../Hooks/getUserImage';


interface OnlineUsers {
    id: number;
    status: string;
    username: string;
    image?: string;
}


export default function OnlineNow () {

    const [users, setUsers] = useState<OnlineUsers[]>([])

    useEffectOnUpdate(() => {
        const fetchOnlineUsers =async () => {
            try {
                const res = await axios.get<OnlineUsers[]>('/api/user/online/users');
                console.log(res.data);
                
                const data = await Promise.all(
                    res.data.map(async (item) => {
                        const image = await getUserImage(item.id)
                        return {...item, image}
                    }))
                setUsers(data)
            }
            catch (err) {
                // console.log(err)
            }
        }
        void fetchOnlineUsers();
    }, [])

    const toggle = users.map(user => {
        return (
            <Avatar username={user.username} imgSource={String(user.image)}/>
        )
    })

    return (
        <section className="online_now">
            <h3>Online now</h3>
            <div className="flex p-4 overflow-hidden">
                {
                    users.length === 0 
                    ?
                    <p>Here's where your online friend will light up</p>
                    :
                    <div className='flex overflow-x-auto gap-x-2'>{toggle}</div>
                }
                
            </div>
        </section>
    );
}