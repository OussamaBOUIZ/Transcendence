import {useEffect, useState} from 'react'
import { Achievement } from '../../global/Interfaces'
import { User } from '../../global/Interfaces'
import axios from 'axios'
import { getAchievementImage } from './getAchievementImage'
import { getUserImage } from './getUserImage'

// const mapImageToAch = async (ach:Achievement) => {
//   const img = await getAchievementImage(ach.id);
//   return {...ach, image: img};
// }

// const fetchAchievementsImages = async (achs: Achievement[]): Promise<Achievement[]> => {
//   const achsWithImages =  Promise.all<Achievement>(
//     achs.map(mapImageToAch)
//   )
//   return achsWithImages;
// }

export const fetchChatOverview  = async (id:number, 
  setUserOverview: (P:User) => void ) => {
  try {
    const res = await axios.get<User>(`../api/user/user/details/${id}`)
    const imgRes = await getUserImage(id)
    // if (res.data.stat?.achievements)
      // res.data.stat.achievements = await fetchAchievementsImages(res.data.stat?.achievements)
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
