import axios from 'axios';
import {useState, useEffect} from "react";
import {FriendUser} from "../../../global/Interfaces"

export const getAllFriends = (id: number): FriendUser[] | [] => {
    const getData = async (id: number): Promise<FriendUser[] | []> => {
        try {
          if (id) {
            const res = await axios.get(`/api/user/allfriends/${id}`);
            return res.data.friends;
          }
        } catch (err) {
            console.log("Error: Failed to fetch all friends.");
            console.log(err);
          }
        return [];
    };
    const [allFriends, setAllFriends] = useState<FriendUser[] | []>([]);

    useEffect(() => {
        const fetchFriends = async () => {
            const friends = await getData(id);
            setAllFriends(friends);
        };
    
        fetchFriends();
    }, []);

    const getFriendImage = async (id: number) : Promise<string | undefined> => {
        try {
          const res = await axios.get(`/api/user/image/${id}`, {responseType: 'blob'})
          return URL.createObjectURL(res.data);
        } catch (err) {
          return undefined;
        }
      };

    useEffect(() => {
        const fetchFriends = async () => {
          const friends = await getData(id);
          const friendswithImage = await Promise.all(
            friends.map(async (friend) => {
              const image = await getFriendImage(friend.id);
              return { ...friend, image };
            })
          );
    
          setAllFriends(friendswithImage);
        };
    
        fetchFriends();
      }, []);
    
    return allFriends
}