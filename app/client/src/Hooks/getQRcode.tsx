import {useState, useEffect} from "react";
import axios from 'axios';

export const getQRcode = (): string => {
    const [QRcode, setQRcode] = useState<string>("");
    
    useEffect(() => {
        const getInfo = async () => {
          try {
            const response = await axios.get("/api/auth/qrcode");
            setQRcode(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        getInfo();
      }, []);

    return QRcode;
}