import axios from 'axios';
import {useState, useEffect} from "react";

export const getAllFriends = (id) => {
    const getData = async (id) => {
        try {
            const res = await axios.get(`/api/user/allfriends/${id}`);
            return res.data.friends;
        } catch (err) {
            console.log("Error: Failed to fetch all friends.");
            console.log(err);
            return [];
        }
    };
    const [allFriends, setAllFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            const friends = await getData(id);
            setAllFriends(friends);
        };
    
        fetchFriends();
    }, [id]);
    
    return { allFriends }
}