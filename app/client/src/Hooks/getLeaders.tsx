import {useState, useEffect} from "react";
import axios from 'axios';
import {Leaders} from "../../../global/Interfaces"

export const getLeaders = () => {
    const [leaders, setLeaders] = useState<Leaders[]>([]);
    
    useEffect(() => {
        const getInfo = async () => {
          try {
            const response = await axios.get("/api/user/leaders");
            setLeaders(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        getInfo();
      }, []);

    return leaders;
}