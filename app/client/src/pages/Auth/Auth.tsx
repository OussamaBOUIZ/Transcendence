import "../../scss/auth.scss";
// import QRcode from "../../Assets/qr-code.png";
import axios from "axios"
import {useState} from "react"
import Notification from "../../components/Notification"
import { getQRcode } from "../../hooks/getQRcode"


export default function Auth() {

    const [notif, setNotif] = useState("")

    const { QRcode } = getQRcode();

    const [codeNumber, setCodeNumber] =useState({
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: ""
    })


    function handleInput() {
        input.forEach(element => {
            if (isNaN(+element)) {
                console.log("error");
                return;
            }
        });
    }

    const collectedCode = Object.values(codeNumber).join('');

    const isNumeric = !Number.isNaN(Number(collectedCode));

    const handleSubmit = () => {
        const sendCode = async () => {
            if (isNumeric && collectedCode.length === 6) {
                try {
                    await axios.post("/api/user/2fa/login", collectedCode);
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("error");
                setNotif("The code is not numeric");
            }
        }
        sendCode();
    };

    const handleChange = (event) => {
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
            key={input.key}
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
                    <p>Scan QR code</p>
                    <p><span>scan and put the code to verify your account</span></p>
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
