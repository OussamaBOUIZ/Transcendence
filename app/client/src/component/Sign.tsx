import React, {useState} from "react"
import {useEffect} from "react"
import Welcome from './SignWelcome.tsx'
import "../scss/Sign.css"

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
        async function rediracte() {
            console.log("start sending")
            const response = await fetch(`/api/auth/${props}`, {
                method: 'GET',
            })
            console.log(response);
            const data = await response.json()
            console.log(data)
        }
        rediracte()
    }

    return (
        <div className='content'>
            <div className='container'>
                <p className="logo">PongLogo</p>
                <Welcome />
                <button className='btn btn-google' onClick={() => handleAuth("google")}>Sign in with Google</button>
                <button className='btn btn-42'onClick={() => handleAuth("42")}>Sign in with 42 Netowrk</button>
                <form>
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
                <p className="forget">Forget password?</p>
                <button className='submit' onClick={handleSubmit}>Sign In</button>
                <p className="SignUp">Don't you have an account? <span>sign up</span></p>
            </div>
            <div className='cover'></div>
        </div>
    )
}