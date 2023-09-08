import React from 'react'
import "../../scss/utils.scss"
import axios, {AxiosResponse} from "axios"
import {User} from '../../../../global/Interfaces'
import {getUserImage} from '../../Hooks/getUserImage'
import UserCard from './UserCard'

export default function ChatSearchBox () {
    const [currentSearch, setCurrentSearch] = React.useState<string>("")
    const [submittedName, setSubmittedName] = React.useState<string>("")
    const [searchedUser, setSearchedUser] = React.useState<User | null>(null);
    const [userExist, setUserExist] = React.useState<boolean>(true);
    const initialRender = React.useRef<boolean>(true)

    const submitStyle = {
        marginTop: "1em",
    }
    function handleChange (e: {target: {value: string}}) {
        setCurrentSearch(e.target.value)
    }

    function handleSubmit (e: React.FormEvent<HTMLElement>) {
        e.preventDefault()
        if (currentSearch !== "")
            setSubmittedName(currentSearch)
    }

    React.useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        async function getUserCard () {
            try {
                const response: AxiosResponse<User> = await axios(`/api/user/search/user/?username=${submittedName}`)
                console.log("response.data.id", response.data.id)
                const imgRes = await getUserImage(response.data.id)
                setSearchedUser({...response.data, image: imgRes})
            } catch (err) {
                setUserExist(false)
            }
        }
        if (submittedName !== "")
            void getUserCard()
    }, [submittedName])

    return (
        <section className="search_box">
            <form onSubmit={handleSubmit}>
                <label>Search</label>
                <input 
                type="search"  
                placeholder="Type a username"
                onChange={handleChange}
                value={currentSearch}
                />
                <input style={submitStyle}type="submit" value="submit" />
            </form>
            {searchedUser
            && 
            <UserCard 
                userData={searchedUser}
                message={true}
                friend={true}
            />
            }
        </section>
    );
}