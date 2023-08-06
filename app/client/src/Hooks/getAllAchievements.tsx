import axios from 'axios';
import { useState, useEffect } from "react";

export const getAllAchievements = (id: number) => {
  const [allAchievements, setAllAchievements] = useState([]);

  const getData = async (id: number) => {
    try {
      const res = await axios.get(`/api/user/achievements/${id}`);
      return res.data;
    } catch (err) {
      console.log("Error: Failed to fetch all friends.");
      console.log(err);
      return [];
    }
  };

  const getAchievementImage = async (id: number) => {
    try {
      const res = await axios.get(`/api/user/achievement/image/${id}`, {responseType: 'blob'})
      return URL.createObjectURL(res.data);
    } catch (err) {
      console.log("Error: Failed to fetch award image.");
      console.log(err);
      return undefined;
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

    fetchAchievements();
  }, []);

  return { allAchievements };
};
