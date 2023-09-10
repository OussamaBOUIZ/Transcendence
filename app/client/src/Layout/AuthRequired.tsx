import React, {useContext} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import UserContext from '../Context/UserContext'
import Loading from '../Pages/Loading'

export default function AuthRequired () {
    
    const {authenticated, isLoading} = useContext(UserContext)

    
    console.log("authenticated : ", authenticated)

    if (isLoading)
        return <Loading />
    if (!authenticated)
        return <Navigate to="/sign" />
    return <Outlet />
}