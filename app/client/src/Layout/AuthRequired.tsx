import React, {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import axios from 'axios'

export default function AuthRequired () {
    // React.useEffect(() => {
        // const authenticated =   axios.get('/api/auth/tokenValidity');
        // console.log(authenticated)
    // }, [])
    const [authenticated, setAuthenticated] = React.useState(false);
    useEffect(() => {
        console.log("here")
        const verifyAuthentication = async () => {
            try {
                const response = await axios.get("/api/auth/tokenValidity");
                console.log(response.data)
                console.log("------")
                // setUserData(response.data);
            }
            catch (error) {
                console.log("------")
                setAuthenticated(error.response.data)
                console.log(authenticated)
            }

        }
        verifyAuthentication();
    }, [])
    // authenticated = true
    // if (!authenticated)
    //     return <div className='center'><h1>You have to login</h1></div>
    return <Outlet />
}