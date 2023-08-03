import axios from 'axios';
import {useState, useEffect} from "react";

export const getAllAchievements = (id : number) => {

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

    useEffect(() => {
        const fetchAchievements = async () => {
            const res = await getData(id);
            setAllAchievements(res);
        };
    
        fetchAchievements();
    }, [id]);
    
    return { allAchievements }
}