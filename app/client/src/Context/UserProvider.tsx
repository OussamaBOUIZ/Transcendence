import React, {createContext, useState, useEffect} from 'react'
import { User } from '../../../global/Interfaces';
import { getUserData } from '../Hooks/getUserData';

export const UserContext = createContext({});

export default function UserProvider ({children}) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string>("");
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        setUser(getUserData());
    }, [])
    return (
        <UserContext.Provider value={{
            user, setUser,
            token, setToken,
            authenticated, setAuthenticated}
        }>
            {children}
        </UserContext.Provider>
    );
} 
