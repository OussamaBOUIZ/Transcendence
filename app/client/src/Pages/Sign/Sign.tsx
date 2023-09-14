import "../../scss/sign.scss"
import googleImg from "../../Assets/Icons/google.png"
import logo42 from "../../Assets/Icons/42Logo.png"
import logo from "../../Assets/Icons/logo1.png"
import React, {useContext, useEffect, useState} from "react"
import UserContext from "../../Context/UserContext"
import Loading from "../Loading"


export default function Sign() {

    const [signInImage, setSignInImage] = useState<string>("");
    const {authenticated, isLoading} = useContext(UserContext);

    console.log("authenticated : ", authenticated);
    if (authenticated)
        window.location.replace('/')

    useEffect(() => {
        const getImage = async () => {
            const random = Math.floor(Math.random() * 4);
              try {
                  const imageModule = await import(`../../Assets/${random}file.jpg`);
                  setSignInImage(imageModule.default);
              }
              catch (error) {
                  console.error("Error loading image:", error);
              }
        }
        void getImage();
    }, []);

    function handleAuth(props: string) {
        window.location.replace(`http://localhost:3000/api/auth/${props}`)
    }

    const welcome = <div className="welcome">
        <img src={logo} alt="" />
            <p className="hd" style={{fontSize: "clamp(4rem, 4.8vw, 4.7rem)"}}>Hi there!</p>
            <p className='pr' style={{fontSize: "clamp(.6rem, .9vw, 1rem)"}}>Welcome to PongLogo, Game Application</p>
        </div>

    const orContent = <div className="orContent">
                            <div className='bar'></div>or<div className='bar'></div>
                        </div>
    const ButtonsAuth = <div className='bttn'>
                            <button className='btn' onClick={() => handleAuth("google")}>
                                <img src={googleImg} alt="" /> Sign in with Google
                            </button>
                            {orContent}
                            <button className='btn'onClick={() => handleAuth("42")}>
                                <img src={logo42} alt="" /> Sign in with 42 Netowrk
                            </button>
                        </div>

    if (isLoading)
        return (<Loading />)
    return (
        <div className="main">
            <img className="bg" src={signInImage} alt="" />
            <div className='content'>
                <div className='container'>
                    {welcome}
                    {ButtonsAuth}
                </div>
                <div
                    className='cover'
                    style={{backgroundImage: `url(${signInImage})`}}>
                </div>
            </div>
        </div>
    )
}