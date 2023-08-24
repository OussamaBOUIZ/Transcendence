import {useEffect, useState} from 'react'
import { StatAchievement } from '../../../global/Interfaces'
import { PlayerData } from '../../../global/Interfaces'
import axios from 'axios'
import { getAchievementImage } from './getAchievementImage'

const fetchChatOverview  = async (id:string): Promise<PlayerData | null> => {
  try {
    const res = await axios.get(`../api/user/user/details/${id}`)
    return (res.data)
  } catch (error) {
    console.error(error);
    return null
  }
}
const mapImageToAch = async (ach:StatAchievement) => {
  const img = await getAchievementImage(ach.id);
  return {...ach, img};
}

const fetchAchievementsImages = async (achs: StatAchievement[]): Promise<StatAchievement[] | null> => {
  const achsWithImages = await Promise.all<StatAchievement[]>(
    achs.map(mapImageToAch)
  )
  return achsWithImages;
}

export default function useChatOverview = (id: number) => {
  const [userOverview, setUserOverview] = useState<PlayerData | null>(null);


}