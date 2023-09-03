import axios from 'axios';
import {useState, useEffect} from "react";
import { getUserImage } from "./getUserImage";
import {FriendUser} from "../../../global/Interfaces"

export const useFetchAllFriends = (id: number, isMyFriend: boolean): FriendUser[] | [] => {

  const [allFriends, setAllFriends] = useState<FriendUser[]>([]);

    const getData = async (id: number): Promise<FriendUser[] | []> => {
        try {
          if (id) {
            const res = await axios.get<{id: number, friends: FriendUser[]}>(`/api/user/allfriends/${id}`);
            return res.data.friends;
          }
        } catch (err) {
            console.log("Error: Failed to fetch all friends.");
            console.log(err);
          }
        return [];
    };

    useEffect(() => {
        const fetchFriends = async () => {
          const friends = await getData(id);
          const friendswithImage = await Promise.all(
            friends.map(async (friend) => {
              const image = await getUserImage(friend.id);
              return { ...friend, image };
            })
          );
    
          setAllFriends(friendswithImage);
        };
    
      void fetchFriends();
      }, [id, isMyFriend]);
    
    return allFriends
}