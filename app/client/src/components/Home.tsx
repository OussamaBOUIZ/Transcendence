import React, {useEffect} from "react"
import {useState} from "react"
import axios from "axios"

export default function Home() {

    // let UserData: 
    let UserData

    useEffect(() => {
        const getUserData = async () => {
            try {
                UserData = await axios.get("/api/auth/getuser")
                console.log(UserData)
            } catch (error) {
                console.log(error)
            }
        }
        getUserData()
    }, [])

    return (
        <div className="welcome">
            <h1>Hi {UserData.username}</h1>
            <h3 className="hd">Welcome to your Home</h3>
        </div>
    )
}