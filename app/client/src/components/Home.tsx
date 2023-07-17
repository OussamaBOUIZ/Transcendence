import React, {useEffect} from "react"
import {useState} from "react"
import axios from "axios"

export default function Home() {

    // let UserData:
    const [UserData, setUserData] = useState({
        id: 0,
        firstname: "",
        lastname: "",
        username: ""
    })

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.get("/api/auth/getuser");
                setUserData(response.data);
            }
            catch (error) {
                console.log(error)
            }

        }
        getUserData()
    }, [])

    return (
        <div className="welcome">
            <h1>Hi {UserData.username} with id {UserData.id} and name {UserData.firstname} </h1>
            <h3 className="hd">Welcome to your Home</h3>
        </div>
    )
}