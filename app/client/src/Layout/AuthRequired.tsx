import React, {useEffect, useContext} from 'react'
import {Outlet} from 'react-router-dom'
import axios from 'axios'
import UserContext from '../Context/UserContext'

export default function AuthRequired () {
    
    const {authenticated, setAuthenticated} = useContext(UserContext)

    useEffect(() => { 
        
        const verifyAuthentication = async () => {
            
            try {
                const response = await axios.get<boolean>("/api/auth/tokenValidity");
                setAuthenticated(response.data)
            }
            catch (error) {
                console.log(error)
                setAuthenticated(error.response.data)
            }

        }
        void verifyAuthentication();
    }, [authenticated])

    
    // if (!authenticated)
    //     return <Navigate to="/sign" />
    return <Outlet />
}