import {useEffect, useState} from 'react'
import { User } from '../../global/Interfaces'
import axios from 'axios'
import { getUserImage } from './getUserImage'


export const fetchChatOverview  = async (id:number, 
  setUserOverview: (P:User) => void ) => {
  try {
    const res = await axios.get<User>(`../api/user/user/details/${id}`)
    const imgRes = await getUserImage(id)
    setUserOverview({...res.data, image: imgRes})
  } catch (error) {
    console.error(error);
  }
}


export default function useChatOverview(id: number) {
  const [userOverview, setUserOverview] = useState<User>({} as User);

  useEffect(()=> {
    fetchChatOverview(id, setUserOverview)
  }, [id])
  return (userOverview)
}
