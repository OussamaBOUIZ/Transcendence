import axios from 'axios';
import {useState, useContext} from "react";
import { getUserImage } from "./getUserImage";
import {FriendUser} from "../../../global/Interfaces"
import UserContext from '../Context/UserContext';
import useEffectOnUpdate from './useEffectOnUpdate';

export const useFetchAllFriends = (id: number, update?: number, setIsMyFriend?: React.Dispatch<React.SetStateAction<boolean>>): FriendUser[] | [] => {

  const {user} = useContext(UserContext)
  const [allFriends, setAllFriends] = useState<FriendUser[]>([]);

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

    useEffectOnUpdate(() => {
        const fetchFriends = async () => {
          const friends = await getData(id);
          const friendswithImage = await Promise.all(
            friends.map(async (friend) => {
              if (setIsMyFriend && friend.id === user.id)
                setIsMyFriend(true)
              const image = await getUserImage(friend.id);
              return { ...friend, image };
            })
          );
    
          setAllFriends(friendswithImage);
        };
    
      void fetchFriends();
      }, [id, update, user]);
    
    return allFriends
}