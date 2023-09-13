import "../../scss/auth.scss";
import axios from "axios"
import React, {useState} from "react"
import Notification from "../../Components/Notification"
import { useFetchQRcode } from "../../Hooks/useFetchQRcode"

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

    const [notif, setNotif] = useState<string>("")

    const QRcode = useFetchQRcode();

    const [codeNumber, setCodeNumber] =useState<Inputs>({} as Inputs)


    // function handleInput() {
    //     input.forEach(element => {
    //         if (isNaN(+element)) {
    //             console.log("error");
    //             return;
    //         }
    //     });
    // }

    const collectedCode = Object.values(codeNumber).join('');

    const isNumeric = !Number.isNaN(Number(collectedCode));

    const handleSubmit = () => {
        const sendCode = async () => {
            if (isNumeric && collectedCode.length === 6) {
                try {
                    const collected = {
                        token: collectedCode,
                    }
                    console.log('token: ', collected);
                    await axios.post("/api/user/2fa/login", collected);
                    console.log('here bro');
                    
                    window.location.replace('/');
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("error");
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
        {notif && <Notification message={notif} />}
        <div className="verify-container" >
            <div className="verification">
                <div className="title">
                    <p>Authenticate your account</p>
                    <p><span>To get the token, you must scan the QR code below</span></p>
                </div>
                <div className="qr-code-container">
                    <img src={QRcode} alt="qr-code" />
                    <div className="inputs">
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
