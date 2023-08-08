import React from 'react'
import "../../scss/utils.scss"
import axios from "axios"
import {User} from '../../../../global/Interfaces'
import { getUserData } from '../../Hooks/getUserData'

function UserCard ({firstname, lastname, username, avatar}) {
    const bgImg = {
        backgroundImage: `url(${avatar})`
    }
    return (
        <figure className='flex-sp'>
                <figcaption>
                    {/* <img src="./src/Assets/cat.jpg" alt="" /> */}
                    <div>
                        <div className="avatar" style={bgImg}></div>
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
    const [searchedUser, setSearchedUser] = React.useState<User | null>(null);


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

    const getUserImage = async (id: number) => {
        try {
          const res = await axios.get(`/api/user/${id}`, {responseType: 'blob'})
          return URL.createObjectURL(res.data);
        } catch (err) {
          console.log("Error: Failed to fetch award image.");
          console.log(err);
          return undefined;
        }
      };

    React.useEffect(() => {
        async function getUser () {
            try {
                const response = await axios(`api/user/?username=${submittedName}`)
                const imgRes = await getUserImage(response.data.id)
                console.log(imgRes)
                setSearchedUser({...response.data, imgRes})
            } catch (err: any) {
                console.log(err.message)
            }
        }
        if (submittedName !== "")
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