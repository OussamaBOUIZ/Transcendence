import {useState, useEffect} from "react";
import axios from 'axios';

export const useFetchQRcode = (): string => {
    const [QRcode, setQRcode] = useState<string>("");
    
    useEffect(() => {
        const getInfo = async () => {
          try {
            const response = await axios.get<string>("/api/auth/qrcode");
            setQRcode(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        void getInfo();
      }, []);

    return QRcode;
}