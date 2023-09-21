import React, {createContext, useState, useEffect} from 'react'
import { User } from '../../global/Interfaces';
import axios from 'axios'
import { getUserImage } from '../Hooks/getUserImage';
import { Socket } from 'socket.io-client';
import { NavigateFunction, useNavigate } from 'react-router';


type typeProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isAnimationFinished: boolean;
  setIsAnimationFinished: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket | undefined;
  setSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>;
  notif: string;
  setNotif: React.Dispatch<React.SetStateAction<string>>;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  show: "inbox" | "main" | "overview";
  setShow: React.Dispatch<React.SetStateAction<"inbox" | "main" | "overview">>;
  statusCode: string;
  setStatusCode: React.Dispatch<React.SetStateAction<string>>;
  statusText: string;
  setStatusText: React.Dispatch<React.SetStateAction<string>>;
  invitation: {hostId: number, image: string;username: string; gameName: string} | undefined;
  setInvitation: React.Dispatch<React.SetStateAction<{hostId: number, image: string;username: string; gameName: string} | undefined>>;
  navigate: NavigateFunction
}

const UserContext = createContext<typeProps>({} as typeProps);

export function UserProvider ({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<User>({} as User);
    const [notif, setNotif] = useState<string>("");
    const [socket, setSocket] = useState<Socket>();
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(false);
    const [update, setUpdate] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [show, setShow] = useState<"inbox" | "main" | "overview">("main");
    const [statusCode, setStatusCode] = useState<string>("")
    const [statusText, setStatusText] = useState<string>("")
    const [invitation, setInvitation] = useState<{hostId: number, image: string, username: string, gameName: string}>()
    const navigate = useNavigate()

  

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
      
      // console.log('USER HERE: ', user);

      const verifyAuthentication = async () => {
        setIsLoading(true);
          try {
              const response = await axios.get("/api/auth/tokenValidity");    
              setAuthenticated(response.data)
          }
          catch (error) {
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
      }, [update])

    return (
        <UserContext.Provider value={{
            user, setUser,
            authenticated, setAuthenticated,
            isAnimationFinished, setIsAnimationFinished,
            socket, setSocket,
            notif, setNotif,
            update, setUpdate,
            isLoading, setIsLoading,
            show, setShow,
            statusCode, setStatusCode,
            statusText, setStatusText,
            invitation, setInvitation,
            navigate
        }}>
            {children}
        </UserContext.Provider>
    );
} 

export default UserContext;