import { useEffect, useState } from "react";
import axios from "axios";
import { getUserImage } from "./getUserImage";
import {User} from "../../../global/Interfaces"

export const getUserData = (): User | null => {

  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<User>("/api/user");
        const image = await getUserImage(response.data.id)
        setUserData({...response.data, image});
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return userData;
};