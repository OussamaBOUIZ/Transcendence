import axios from 'axios';
import {useState, useEffect} from "react";

export const getAchievementImage = (id: number) => {

    const [achievementImage, setAchievementImage] = useState<string>("");

    const getData = async (id: number) => {
        try {
            const res = await axios.get(`/api/user/achievement/image/${id}`);
            return res.data;
        } catch (err) {
            console.log("Error: Failed to fetch award image.");
            console.log(err);
            return [];
        }
    };

    useEffect(() => {
        const fetchAchievement = async () => {
            const res = await getData(id);
            setAchievementImage(res);
        };
    
        fetchAchievement();
    }, [id]);
    
    return { achievementImage }
}