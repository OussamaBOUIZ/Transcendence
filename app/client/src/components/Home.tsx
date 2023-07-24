import React, {useEffect} from "react"
import {useState} from "react"
import axios from "axios"
import "./home.scss";

export default function Home() {

    // let UserData:
    const [UserData, setUserData] = useState({
        id: 0,
        firstname: "",
        lastname: "",
        username: ""
    })

    // useEffect(() => {
    //     const getUserData = async () => {
    //         try {
    //             const response = await axios.get("/api/auth/getuser");
    //             setUserData(response.data);
    //         }
    //         catch (error) {
    //             console.log(error)
    //         }

    //     }
    //     getUserData()
    // }, [])

    return (
        <div className="grid">
            {/* <h1>Hi {UserData.username} with id {UserData.id} and name {UserData.firstname} </h1>
            <h3 className="hd">Welcome to your Home</h3> */}
            <div className="item item1"></div>
            <div className="item item2"></div>
            <div className="item item3"></div>
            <div className="item item4"></div>
            <div className="item item5"></div>
            <div className="item item6"></div>
        </div>
    )
}