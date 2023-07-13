import React, {useState} from "react"
import {useEffect} from "react"
import Welcome from './SignWelcome.tsx'
import "../scss/sign.scss"
import googleImg from "../Assets/Icons/google.png"
import logo42 from "../Assets/Icons/42Logo.png"

export default function Sign() {

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    function handleChange(event: any) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
          ...prevFormData,
            [name]: value
        }))
    }


    function handleSubmit() {
        async function sendFormData() {
            const response = await fetch('/api/auth/signin', {
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

    return (
        <div className="main">
            <nav>
                <h3>PongLogo</h3>
            </nav>
            <div className='content'>
                <div className='container'>
                    <Welcome />
                    <main>
                        <div className='bttn'>
                            <button className='btn btn-google' onClick={() => handleAuth("google")}><img src={googleImg} alt="" /> Sign in with Google</button>
                            <button className='btn btn-42'onClick={() => handleAuth("42")}><img src={logo42} alt="" /> Sign in with 42 Netowrk</button>
                        </div>
                        <div className="orContent">
                            <div className='bar bar-1'></div>
                            or
                            <div className='bar bar-2'></div>
                        </div>
                        <form className='form'>
                            <input
                                type='text'
                                placeholder='Username'
                                name='username'
                                onChange={handleChange}
                                value={formData.username}
                                ></input>
                            <input
                                type='text'
                                placeholder='Password'
                                name='password'
                                onChange={handleChange}
                                value={formData.password}
                                ></input>
                        </form>
                    </main>
                    <span className="forget"><p>Forget password?</p></span>
                    <button className='submit' onClick={handleSubmit}>Sign In</button>
                    <p className="signUp">Don't you have an account? <span>sign up</span></p>
                </div>
            </div>
            <div className='cover'></div>
        </div>
    )
}