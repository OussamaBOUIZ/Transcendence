import axios from 'axios';
import { useState, useEffect } from "react";
import {Achievement} from "../../../global/Interfaces"
import {getAchievementImage} from "./getAchievementImage"

export const useAllAchievements = (id: number): Achievement[] | [] => {
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);

  const getData = async (id: number): Promise<Achievement[] | []> => {
    try {
      const res = await axios.get<Achievement[]>(`/api/user/achievements/${id}`);
      return res.data;
    } catch (err) {
      console.log("Error: Failed to fetch all friends.");
      console.log(err);
      return [];
    }
  };


  useEffect(() => {
    const fetchAchievements = async () => {
      const achievementsData = await getData(id);
      const achievementsWithImages = await Promise.all(
        achievementsData.map(async (achievement) => {
          const image = await getAchievementImage(achievement.id);
          return { ...achievement, image };
        })
      );

      setAllAchievements(achievementsWithImages);
    };

    void fetchAchievements();
  }, [id]);

  return allAchievements;
};
