import React from 'react'
import "../../scss/utils.scss"
import axios from "axios"
import {User} from '../../../../global/Interfaces'
import addUserIcon from "../../Assets/Icons/addUser.svg"
import {getUserImage} from '../../Hooks/getUserImage'
import ProfileImage from "../../Components/profileImage"

export default function ChatSearchBoxId ({handleId}) {
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
                const imgRes = await getUserImage(response.data[0].id)
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


    const Users =   <figure className='flex-sp items-center px-3'>
                        <figcaption>
                            <div className='flex gap-4 items-center'>
                                <ProfileImage image={searchedUser?.image} size="medium"/>
                                <div>
                                    <h5 className='text-lg font-semibold'>{searchedUser?.firstname} {searchedUser?.lastname}</h5>
                                    <p className='text-base'>{searchedUser?.username}</p>
                                </div>
                            </div>
                        </figcaption>
                        <link></link>
                        <div
                            className="w-6 cursor-pointer"
                            onClick={() => handleId(searchedUser?.id)}>
                            <img src={addUserIcon} alt="addUserButton" />
                        </div>
                    </figure>

    return (
        <section className="search_box">
            <form onSubmit={handleSubmit} >
                <label>Search</label>
                <input 
                type="search"  
                placeholder="Type a username"
                onChange={handleChange}
                value={currentSearch}
                />
            </form>
            { searchedUser && Users }
        </section>
    );
}