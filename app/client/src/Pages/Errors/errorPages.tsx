import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../Context/UserContext';

const ErrorPage = () => {
  const {statusCode, statusText} = useContext(UserContext)

  return (
    <div className="error-page flex w-full h-full flex-col items-center justify-center font-bold text-3xl gap-4">
        <h1 className=''>Oops! {statusCode}</h1>
        <p className='text-xl font-normal'>{statusText}</p>
        <NavLink to={'/'}><button className='text-xl px-8 py-2 rounded-xl bg-primary-pink'>Home</button></NavLink>
    </div>
  );
};

export default ErrorPage;
