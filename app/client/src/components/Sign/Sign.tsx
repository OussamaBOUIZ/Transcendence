import React, {useState} from "react"
import {useEffect} from "react"
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
        async function sendFormData() {
            const response = await fetch(`/api/auth/sign${SignX}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    body: JSON.stringify({ formData }),
                },
            })
            const data = await response.json()
            console.log(data)
        }
        sendFormData()
    }

    function handleAuth(props: string) {
        window.location.replace(`http://localhost:3000/api/auth/${props}`)
    }

    const orContent = <div className="orContent">
                            <div className='bar'></div>
                            or
                            <div className='bar'></div>
                        </div>
    const ButtonsAuth = <div className='bttn'>
                            <button className='btn btn-google' onClick={() => handleAuth("google")}><img src={googleImg} alt="" /> Sign in with Google</button>
                            <button className='btn btn-42'onClick={() => handleAuth("42")}><img src={logo42} alt="" /> Sign in with 42 Netowrk</button>
                        </div>

    return (
        <div className="main">
            <nav>
                <h3>PongLogo</h3>
            </nav>
            <div className='content'>
                <div className='container'>
                    <Welcome SignX={SignX} />
                    <main>
                        {ButtonsAuth}
                        {orContent}
                        <Form
                            SignX = {SignX}
                            handleChange={handleChange}
                            formData={formData}
                            setFormData={setFormData}
                            formDataUp={formDataUp}
                            setFormDataUp={setFormDataUp}
                        />
                    </main>
                    {SignX === "in" && <span className="forget"><p>Forget password?</p></span>}
                    <button className='submit' onClick={handleSubmit}>
                        {
                            SignX === "in" ?
                            <span>sign in</span> :
                            <span>sign up</span>
                        }
                    </button>
                    <div className="signUp" onClick={handleClick} >
                        {
                            SignX === "in" ?
                            <p>Don't you have an account? <span>sign up</span></p> :
                            <p>Already have an account? <span>sign in</span></p>
                        }
                    </div>
                </div>
            </div>
            <div
                className='cover'
                style={SignX === "in" ?
                {backgroundImage: `url(${SignInImage})`} :
                {backgroundImage: `url(${SignUpImage})`}}>
            </div>
        </div>
    )
}