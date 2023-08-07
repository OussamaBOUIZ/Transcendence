import { useEffect, useState } from "react";
import axios from "axios";
import {User} from "../../../global/Interfaces"

export const getUserData = (): User | null => {

  const [userData, setUserData] = useState<User | null>(null);

  const getUserImage = async (id: number) => {
    try {
      const res = await axios.get(`/api/user/${id}`, {responseType: 'blob'})
      return URL.createObjectURL(res.data);
    } catch (err) {
      console.log("Error: Failed to fetch award image.");
      console.log(err);
      return undefined;
    }
  };

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
