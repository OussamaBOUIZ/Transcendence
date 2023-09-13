import { useState, useEffect } from "react";
import {Achievement} from "../../global/Interfaces"
import {getAchievementImage} from "./getAchievementImage"

export const useAllAchievements = (achievements?: Achievement[]): Achievement[] | [] => {
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);

  if (!achievements)
    return [];

  useEffect(() => {
    const fetchAchievements = async () => {
      const achievementsWithImages = await Promise.all(
        achievements.map(async (achievement) => {
          const image = await getAchievementImage(achievement.id);
          return { ...achievement, image };
        })
      );

      setAllAchievements(achievementsWithImages);
    };

    void fetchAchievements();
  }, [achievements]);

  return allAchievements;
};
