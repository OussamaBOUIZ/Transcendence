import React from 'react';
import {useState, useEffect} from "react";
import axios from 'axios';

export const getLeaders = () => {
    const [leaders, setLeaders] = useState<any[]>([]);
    
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

    return { leaders }
}