import React, { useContext, useEffect } from 'react'
import UserContext from '../../Context/UserContext';

export default function PageNotFound() {
    const {navigate} = useContext(UserContext);
    useEffect (() => {

        navigate('/error', { state: { statusCode: 404, statusText: "Page Not Found :(" } });
    }, [])
  return (null)
}
