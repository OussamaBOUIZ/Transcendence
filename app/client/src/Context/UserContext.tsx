import React, {createContext, useState, useEffect} from 'react'
import { User } from '../../../global/Interfaces';
import axios from 'axios'
import { getUserImage } from '../Hooks/getUserImage';

const UserContext = createContext({});

export function UserProvider ({children}) {
    const [user, setUser] = useState<User | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    const fetchUserData = async () => {
        try {
          const response = await axios.get<User>("/api/user"); 
          const image = await getUserImage(response.data.id)
          setUser({...response.data, image});
          // console.log(user);
          
        } catch (error) {
          // console.log(error);
        }
      };

    // console.log(authenticated);
    
    useEffect(() => {
        fetchUserData();
      }, [])


    return (
        <>
            <UserContext.Provider value={{
                user, setUser,
                authenticated, setAuthenticated
            }}>
                {children}
            </UserContext.Provider>
        </>
    );
} 

export default UserContext;
