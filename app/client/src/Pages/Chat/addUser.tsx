import React, {useRef, useState, useEffect} from 'react'
import axios from "axios"
import {User} from '../../../../global/Interfaces'
import {getUserImage} from '../../Hooks/getUserImage'
import UserCard from './UserCard'

export default function AddUser() {
    const [currentSearch, setCurrentSearch] = useState("")
    const [submittedName, setSubmittedName] = useState("")
    const [searchedUser, setSearchedUser] = useState<User | null>(null);
    const initialRender = useRef(true)

    function handleChange (e) {
        setCurrentSearch(e.target.value)
    }

    function handleSubmit (e) {
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
                const response = await axios(`/api/user/search/user/?username=${submittedName}`)
                const imgRes = await getUserImage(response.data[0].id)
                setSearchedUser({...response.data[0], image: imgRes})
            } catch (err: any) {
                console.log(err.message)
            }
        }
        if (submittedName !== "")
        {
            console.log(submittedName)
            void getUserCard()
        }
    }, [submittedName])

    return (
        <section className="bg-primary-color flex flex-col rounded-xl">
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <label className='pl-3 pt-3'>Search</label>
                <div className='flex gap-2 items-center p-2'>
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
            {searchedUser
            && 
            <UserCard 
                user={searchedUser}
                add={true}
            />
            }
        </section>
    );
}