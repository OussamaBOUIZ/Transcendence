import React, {useContext} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import UserContext from '../Context/UserContext'
import Loading from '../Pages/Loading'

export default function ProtectedLanding () {

    const {authenticated, isLoading} = useContext(UserContext)
    
    if (isLoading)
        return <Loading />
    if (authenticated)
        return <Navigate to="/" />
    return (
        <>
            <Outlet />
        </>
    )
}