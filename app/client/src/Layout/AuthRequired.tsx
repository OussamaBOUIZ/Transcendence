import React, {useEffect, useContext} from 'react'
import {Outlet} from 'react-router-dom'
import axios from 'axios'
import UserContext from '../Context/UserContext'

export default function AuthRequired () {

    const {authenticated, setAuthenticated} = useContext(UserContext)

    useEffect(() => {       
        const verifyAuthentication = async () => {
            try {
                const response = await axios.get("/api/auth/tokenValidity");
                setAuthenticated(response.data)
            }
            catch (error) {
                console.log(error)
                setAuthenticated(error.response.data)
            }

        }
        verifyAuthentication();
    }, [])

    if (!authenticated)
        return <div className='center'><h1>You have to login</h1></div>
    return <Outlet />
}