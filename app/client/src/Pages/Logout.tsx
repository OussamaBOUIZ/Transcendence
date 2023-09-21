import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import UserContext from '../Context/UserContext'
import Loading from './Loading'

export default function Logout () {

    const {user, navigate} = useContext(UserContext)

    const logout = async () => {
        try {
            const res = await axios.post(`/api/user/logout/${user.id}`)
            if (res.data.length === 0)
                window.location.href = '/sign'
        }
        catch (err: any) {
            navigate('/error', { state: { statusCode: err.response.status, statusText: err.response.statusText } });
        }
    }

    useEffect( () => {
        logout();
    }, [user])

    return <Loading />
}