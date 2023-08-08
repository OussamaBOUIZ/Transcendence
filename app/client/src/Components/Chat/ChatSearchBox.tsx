import React from 'react'
import "../../scss/utils.scss"
import axios from "axios"

// function UserCard () {

// }

export default function ChatSearchBox () {
    const [currentSearch, setCurrentSearch] = React.useState("")
    const [submittedName, setSubmittedName] = React.useState("")

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
        async function getUser () {
            try {
                const response = await axios(`api/user/?username=${submittedName}`)
                console.log(response.data)
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
            <figure className='flex-sp'>
                <figcaption>
                    {/* <img src="./src/Assets/cat.jpg" alt="" /> */}
                    <div>
                    <h5>firstName LastName</h5>
                    <p>username</p>
                    </div>
                </figcaption>
                <div>
                    <button>DM</button>
                    <button>ADD</button>
                </div>
            </figure>
        </section>
    );
}