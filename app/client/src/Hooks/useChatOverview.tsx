import {useEffect, useState} from 'react'
import { StatAchievement } from '../../../global/Interfaces'
import { PlayerData } from '../../../global/Interfaces'
import axios from 'axios'
import { getAchievementImage } from './getAchievementImage'

const mapImageToAch = async (ach:StatAchievement) => {
  const img = await getAchievementImage(ach.id);
  return {...ach, img};
}

const fetchAchievementsImages = async (achs: StatAchievement[]): Promise<StatAchievement[]> => {
  const achsWithImages =  Promise.all<StatAchievement[]>(
    achs.map(mapImageToAch)
  )
  return achsWithImages;
}

const fetchChatOverview  = async (id:number, 
  setUserOverview: (P:PlayerData) => void ) => {
  try {
    const res = await axios.get(`../api/user/user/details/${id}`)
    const data:PlayerData = res.data;
    data.stat.achievements = await fetchAchievementsImages(data.stat.achievements)
    setUserOverview(data)
  } catch (error) {
    console.error(error);
  }
}


export default function useChatOverview(id: number) {
  const [userOverview, setUserOverview] = useState<PlayerData>({} as PlayerData);

  useEffect(()=> {
    fetchChatOverview(id, setUserOverview)

  }, [])
  return (userOverview)
}
