import React, {useRef, useState, useEffect, useContext} from 'react'
import axios from "axios"
import {User} from '../../../global/Interfaces'
import {getUserImage} from '../../Hooks/getUserImage'
import UserCard from './UserCard'
import { SocketContext } from './ChatRooms'
import Xmark from "../../Assets/Icons/xmark-solid.svg"
import {handleClickOutside} from "../../Helpers/utils"
import UserContext from '../../Context/UserContext'
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate'

export default function AddUser() {
    const [currentSearch, setCurrentSearch] = useState<string>("")
    const [submittedName, setSubmittedName] = useState<string>("")
    const [searchedUser, setSearchedUser] = useState<User>({} as User);
    const initialRender = useRef(true)
    const {user, setNotif} = useContext(UserContext)
    const {setShowSearch} = useContext(SocketContext)
    const wrapperRef = handleClickOutside(setShowSearch)

    function handleChange (e: { target: { value: string; }; }) {
        setCurrentSearch(e.target.value)
    }

    function handleSubmit (e: React.FormEvent<HTMLElement>) {
        e.preventDefault()
        if (currentSearch !== "")
            setSubmittedName(currentSearch)
    }

    useEffectOnUpdate(() => {
        async function getUserCard () {
            try {
                const response = await axios.get<User>(`/api/user/search/user/?username=${submittedName}`)
                const imgRes = await getUserImage(response.data.id)
                setSearchedUser({...response.data, image: imgRes})
            } catch (err: any) {
                setNotif("User not Found");
                setCurrentSearch("")
            }
        }
        if (submittedName !== user.username && submittedName.length)
            void getUserCard()
    }, [submittedName])

    return (
        <section className="bg-primary-color flex flex-col rounded-xl p-2" ref={wrapperRef}>
            <div className="flex justify-end">
                <img className="w-6 cursor-pointer" onClick={() => setShowSearch(false)} src={Xmark} alt="exit" />
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
                    <input className="bg-primary-pink py-1 px-2 rounded-md cursor-pointer" type="submit" value="search" />
                </div>
            </form>
            {searchedUser.id
            && 
            <UserCard 
                userData={searchedUser}
                add={true}
            />
            }
        </section>
    );
}