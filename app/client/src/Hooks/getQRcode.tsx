import {useState, useEffect} from "react";
import axios from 'axios';

export const getQRcode = () => {
  console.log('YEYYEYEYEYYE')
    const [QRcode, setQRcode] = useState("");
    
    useEffect(() => {
        const getInfo = async () => {
          try {
            const response = await axios.get("/api/auth/qrcode");
            console.log(response)
            setQRcode(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        getInfo();
      }, []);

    return { QRcode }
}