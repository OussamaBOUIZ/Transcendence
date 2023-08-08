import React from 'react'
import "../../scss/utils.scss"
import axios from "axios"
import {User} from '../../../../global/Interfaces'

function UserCard ({firstname, lastname, username}) {
    return (
        <figure className='flex-sp'>
                <figcaption>
                    {/* <img src="./src/Assets/cat.jpg" alt="" /> */}
                    <div>
                    <h5>{firstname} {lastname}</h5>
                    <p>{username}</p>
                    </div>
                </figcaption>
                <div>
                    <button>DM</button>
                    <button>ADD</button>
                </div>
            </figure>
    )
}

export default function ChatSearchBox () {
    const [currentSearch, setCurrentSearch] = React.useState("")
    const [submittedName, setSubmittedName] = React.useState("")
    let searchedUser: User


    const submitStyle = {
        marginTop: "1em",
    }
    function handleChange (e) {
        setCurrentSearch(e.target.value)
    }

    function handleSubmit (e) {
        e.preventDefault()
        if (currentSearch !== "")
        {
            setSubmittedName(currentSearch)
            // setCurrentSearch("") 
        }
    }

    React.useEffect(() => {
        async function getUser () {
            try {
                const response = await axios(`api/user/?username=${submittedName}`)
                console.log("------")
                console.log(response.data)
                searchedUser = response.data
                console.log("searchUser: ", searchedUser)
                console.log("------")
            } catch (err) {
                console.log(err.message)
            }
        }
        if (submittedName !== "")0
        {
            console.log(submittedName)
            getUser()
        }
    }, [submittedName])

    return (
        <section className="search_box">
            <form onSubmit={handleSubmit}>
                <label>Search</label>
                <input 
                type="search" 
                name="" 
                id="" 
                placeholder="Type a username"
                onChange={handleChange}
                value={currentSearch}
                />
                <input style={submitStyle}type="submit" value="submit" />
            </form>
            {/* {   submittedName !== "" && 
                (true
                ?
                <UserCard 
                    firstname={searchedUser.firstname}
                    lastname={searchedUser.lastname}
                    username={searchedUser.username}
                />
                :
                <h3>There is no user with this name</h3>)
            } */}
        </section>
    );
}