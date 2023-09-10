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
            catch (e: any) {
                // console.log(error)
                setAuthenticated(e.response.data)
            }

        }
        void verifyAuthentication();
    }, [authenticated])

    
    // if (!authenticated)
    //     return <Navigate to="/sign" />
    return <Outlet />
}