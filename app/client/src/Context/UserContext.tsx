import React, {createContext, useState, useEffect} from 'react'
import { User } from '../../../global/Interfaces';
import axios from 'axios'
import { getUserImage } from '../Hooks/getUserImage';


type typeProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isAnimationFinished: boolean;
  setIsAnimationFinished: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<typeProps>({} as typeProps);

export function UserProvider ({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<User>({} as User);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)


    const fetchUserData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get<User>("/api/user"); 
          const image = await getUserImage(response.data.id)
          setUser({...response.data, image});
          
        } catch (error) {
          // console.log(error);
        }
        setIsLoading(false);
      };


      const verifyAuthentication = async () => {
        setIsLoading(true);
          try {
              const response = await axios.get("/api/auth/tokenValidity");    
              console.log("response.data : ", response.data);
              setAuthenticated(response.data)
              console.log("setting to TRUE");
          }
          catch (error) {
              console.log("setting to FALSE");
              setAuthenticated(false)
          }
          setIsLoading(false)
      }

    useEffect(() => { 
        void verifyAuthentication();
    }, [])

    
    useEffect(() => {
        if (user)
          void fetchUserData();
      }, [])

    return (
        <UserContext.Provider value={{
            user, setUser,
            authenticated, setAuthenticated,
            isAnimationFinished, setIsAnimationFinished,
            isLoading, setIsLoading
        }}>
            {children}
        </UserContext.Provider>
    );
} 

export default UserContext;
