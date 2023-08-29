import React from 'react'
import "../../scss/utils.scss"
import axios from "axios"
import {User} from '../../../../global/Interfaces'
import {getUserImage} from '../../Hooks/getUserImage'
import UserCard from './UserCard'

export default function ChatSearchBox () {
    const [currentSearch, setCurrentSearch] = React.useState("")
    const [submittedName, setSubmittedName] = React.useState("")
    const [searchedUser, setSearchedUser] = React.useState<User | null>(null);
    const initialRender:any = React.useRef(true)

    const submitStyle = {
        marginTop: "1em",
    }
    function handleChange (e) {
        setCurrentSearch(e.target.value)
    }

    function handleSubmit (e) {
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
                const response = await axios(`/api/user/search/user/?username=${submittedName}`)
                const imgRes = await getUserImage(response.data[0].id)
                setSearchedUser({...response.data[0], image: imgRes})
            } catch (err: any) {
                console.log(err.message)
            }
        }
        if (submittedName !== "")
            getUserCard()
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
                user={searchedUser}
                message={true}
                friend={true}
            />
            }
        </section>
    );
}