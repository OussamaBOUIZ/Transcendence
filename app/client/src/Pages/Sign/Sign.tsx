import {useState} from "react"
import axios from 'axios'
import Notification from "../../Components/Notification"
import Welcome from './SignWelcome'
import "../../scss/sign.scss"
import googleImg from "../../Assets/Icons/google.png"
import logo42 from "../../Assets/Icons/42Logo.png"
import Form from './SignForm'
import SignInImage from '../../Assets/DreamShaper_32_young_man_character_playing_ping_pong_full_body_2.jpeg'
import SignUpImage from '../../Assets/DreamShaper_32_young_man_character_playing_ping_pong_full_body_3.jpeg'

export default function Sign() {

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const [formDataUp, setFormDataUp] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })

    const [notif, setNotif] = useState("")

    const [SignX, setSignX] = useState("in")

    function handleChange(event: any) {
        const {name, value} = event.target
        if (SignX === "in") {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }))
        } else {
            setFormDataUp(prevFormDataUp => ({
                ...prevFormDataUp,
                [name]: value
            }))
        }
    }



    function handleClick() {
        setSignX(prev => (prev === "in" ? "up" : "in"));
    }

    function handleSubmit() {
        console.log("cdscdsz")
        setNotif("")
        const bodyResponse = SignX === "in" ? formData : formDataUp
        const sendFormData = async () => {
        try {
            
            const response = await axios.post(`/api/auth/sign${SignX}`, bodyResponse);
            SignX === "up" ? setNotif(response.data) : window.location.replace("http://localhost:5173/home")
        } catch (error) {
            error.response.data.message === undefined ?
            setNotif(error.response.data) :
            setNotif(error.response.data.message)
        }
        };
        sendFormData()
    }

    
    function handleAuth(props: string) {
        console.log(`props ${props}`)
        window.location.replace(`http://localhost:3000/api/auth/${props}`)
    }

    const orContent = <div className="orContent">
                            <div className='bar'></div>
                            or
                            <div className='bar'></div>
                        </div>
    const ButtonsAuth = <div className='bttn'>
                            <button className='btn btn-google' onClick={() => handleAuth("google")}><img src={googleImg} alt="" /> Sign in with Google</button>
                            {orContent}
                            <button className='btn btn-42'onClick={() => handleAuth("42")}><img src={logo42} alt="" /> Sign in with 42 Netowrk</button>
                        </div>


    return (
        <div className="main">
           {notif && <Notification message={notif} />}
            <div className='content'>
                {/* <div className='container'>
                    <Welcome SignX={SignX} />
                        {ButtonsAuth}
                </div> */}
                {/* <div
                    className='cover'
                    // style={SignX === "in" ?
                    // {backgroundImage: `url(${SignInImage})`} :
                    // {backgroundImage: `url(${SignUpImage})`}}>
                    >
                </div> */}
            </div>
        </div>
    )
}