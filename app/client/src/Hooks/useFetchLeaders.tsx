import {useState, useEffect} from "react";
import axios from 'axios';
import {Leaders} from "../../../global/Interfaces"
import { getUserImage } from "./getUserImage";

export const useFetchLeaders = (): Leaders[] | [] => {
    const [leaders, setLeaders] = useState<Leaders[]>([]);

    useEffect(() => {
      const getInfo = async () => {
        try {
          const response = await axios.get<Leaders[] | []>("/api/user/leaders");
          const leadersWithImages = await Promise.all(
            response.data.map(async (leader) => {
              const image = await getUserImage(leader.id);
              return { ...leader, image };
            })
          );
          setLeaders(leadersWithImages);
        } catch (error) {
          console.log(error);
        }
      };
  
    void getInfo();
    }, []);

    return leaders;
}