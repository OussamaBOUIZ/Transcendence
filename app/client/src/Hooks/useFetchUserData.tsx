import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchUserData = () => {
  // const initialUserData = {
  //   id: 0,
  //   firstname: "",
  //   lastname: "",
  //   username: ""
  // };

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log("effect");
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user");
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return { userData };
};
