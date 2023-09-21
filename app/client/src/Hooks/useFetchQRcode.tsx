import {useState, useEffect, useContext} from "react";
import axios from 'axios';
import UserContext from "../Context/UserContext";

export const useFetchQRcode = (): string => {
  const [QRcode, setQRcode] = useState<string>("");
  const {navigate} = useContext(UserContext)

  useEffect(() => {
      const getInfo = async () => {
        try {
          const response = await axios.get<string>("/api/auth/qrcode");
          setQRcode(response.data);
        } catch (err: any) {
          navigate('/error', { state: { statusCode: err.response.status, statusText: err.response.statusText } });
        }
      };
      void getInfo();
    }, []);

  return QRcode;
}