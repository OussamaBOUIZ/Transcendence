import React, {useRef, useState, useEffect, useContext} from 'react'
import axios, {AxiosResponse} from "axios"
import {User} from '../../../../global/Interfaces'
import {getUserImage} from '../../Hooks/getUserImage'
import UserCard from './UserCard'
import { SocketContext } from './ChatRooms'
import Xmark from "../../Assets/Icons/xmark-solid.svg"

export default function AddUser() {
    const [currentSearch, setCurrentSearch] = useState("")
    const [submittedName, setSubmittedName] = useState("")
    const [searchedUser, setSearchedUser] = useState<User>({} as User);
    const initialRender = useRef(true)
    const {setShowSearch} = useContext(SocketContext)

    function handleChange (e: { target: { value: string; }; }) {
        setCurrentSearch(e.target.value)
    }

    function handleSubmit (e: React.FormEvent<HTMLElement>) {
        e.preventDefault()
        if (currentSearch !== "")
            setSubmittedName(currentSearch)
    }

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        async function getUserCard () {
            try {
                const response: AxiosResponse<User> = await axios(`/api/user/search/user/?username=${submittedName}`)
                const imgRes = await getUserImage(response.data.id)
                setSearchedUser({...response.data, image: imgRes})
            } catch (err) {
                // console.log(err.message)
            }
        }
        if (submittedName !== "")
        {
            console.log(submittedName)
            void getUserCard()
        }
    }, [submittedName])

    return (
        <section className="bg-primary-color flex flex-col rounded-xl p-2">
            <div className="flex justify-end">
                <img className="w-6 cursor-pointer" onClick={() => setShowSearch(prev => !prev)} src={Xmark} alt="exit" />
            </div>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <label>Search</label>
                <div className='flex gap-2 items-center'>
                    <input 
                    type="search"  
                    className='w-4/5 py-1 px-2 bg-input rounded-sm'
                    placeholder="Type a username"
                    onChange={handleChange}
                    value={currentSearch}
                    />
                    <input className="bg-violet-900 py-1 px-2 rounded-md" type="submit" value="search" />
                </div>
            </form>
            {searchedUser.id
            && 
            <UserCard 
                user={searchedUser}
                add={true}
            />
            }
        </section>
    );
}