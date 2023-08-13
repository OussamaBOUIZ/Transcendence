import React from 'react'
import "../../scss/utils.scss"
import axios from "axios"
import {User} from '../../../../global/Interfaces'
// import { getUserData } from '../../Hooks/getUserData'
import {getUserImage} from '../../Hooks/getUserImage'
import UserCard from '../../Components/UserCard'

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
                const response = await axios(`../api/user/search/user/?username=${submittedName}`)
                // console.log(response)
                const imgRes = await getUserImage(response.data.id)
                setSearchedUser({...response.data[0], image: imgRes})
                console.log(searchedUser)
            } catch (err: any) {
                console.log(err.message)
            }
        }
        if (submittedName !== "")
        {
            console.log(submittedName)
            getUserCard()
        }
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
                firstname={searchedUser.firstname}
                lastname={searchedUser.lastname}
                username={searchedUser.username}
                avatar={searchedUser.image}
            />
            }
        </section>
    );
}