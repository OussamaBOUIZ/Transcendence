import "../../scss/auth.scss";
import axios from "axios"
import React, {useContext, useState} from "react"
import Notification from "../../Components/Notification"
import { useFetchQRcode } from "../../Hooks/useFetchQRcode"
import UserContext from "../../Context/UserContext";

interface Inputs {
    [id: number]: string;
    input1: string,
    input2: string,
    input3: string,
    input4: string,
    input5: string,
    input6: string,
}


export default function Auth() {
    const {user, navigate, setNotif} = useContext(UserContext)
    // const [notif, setNotif] = useState<string>("")
    const QRcode = useFetchQRcode();
    const [codeNumber, setCodeNumber] =useState<Inputs>({} as Inputs)

    const collectedCode = Object.values(codeNumber).join('');

    const isNumeric = !Number.isNaN(Number(collectedCode));

    const handleSubmit = () => {
        const sendCode = async () => {
            if (isNumeric && collectedCode.length === 6) {
                try {
                    const collected = { token: collectedCode }
                    const res = await axios.post(`/api/user/2fa/login/${user.id}`, collected);
                    if(res.data.length == 0) {
                        await axios.get(`/api/user/2fa/turn-on/${user?.id}`)
                        window.location.href = '/'
                    }
                    else {                        
                        setNotif('token is not valid');
                    }
                } catch (err: any) {
                    navigate('/error', { state: { statusCode: err.response.status, statusText: err.response.statusText } });
                }
            } else {
                setNotif("The code is not numeric");
            }
        }
        void sendCode();
    };

    const handleChange = (event: { target: { id: string; value: string; }; }) => {
        const { id, value } = event.target;
        setCodeNumber((prevCodeNumber) => ({ ...prevCodeNumber, [id]: value }));
      };

    const Ids = [
        {key: 1, id: "input1"},
        {key: 2, id: "input2"},
        {key: 3, id: "input3"},
        {key: 4, id: "input4"},
        {key: 5, id: "input5"},
        {key: 6, id: "input6"}
    ]

    const inputs = Ids.map(input => {
        return (
            <input
            key={input.id}
            type="text"
            id={input.id}
            maxLength={1}
            value={codeNumber[input.key]}
            onChange={handleChange}
            />
        )
    })


  return (
    <>
        {/* {notif && <Notification message={notif} />} */}
        <div className="verify-container" >
            <div className="verification p-10 lg:p-14">
                <div className="title text-center">
                    <p className="text- text-base sm:text-xl md:text-2xl xl:text-3xl">Authenticate your account</p>
                    <p><span className="text-xs sm:text-xs md:text-sm">To get the token, you must scan the QR code below</span></p>
                </div>
                <div className="qr-code-container">
                    <img src={QRcode} alt="qr-code" />
                    <div className="inputs flex justify-center flex-wrap">
                        {inputs}
                    </div>
                </div>
                <button
                    className="action"
                    onClick={handleSubmit}>
                    verify account
                </button>
            </div>
        </div>
    </>
  );
}
