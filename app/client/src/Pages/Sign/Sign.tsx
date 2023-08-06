import "../../scss/sign.scss"
import googleImg from "../../Assets/Icons/google.png"
import logo42 from "../../Assets/Icons/42Logo.png"
import logo from "../../Assets/Icons/logo.png"
import SignInImage from '../../Assets/2f964e6c-a41e-4baa-b88c-4e7237f2e606.jpg'

export default function Sign() {
    
    function handleAuth(props: string) {
        console.log(`props ${props}`)
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


    return (
        <div className="main">
            <img className="bg" src={SignInImage} alt="" />
            <div className='content'>
                <div className='container'>
                    {welcome}
                    {ButtonsAuth}
                </div>
                <div
                    className='cover'
                    style={{backgroundImage: `url(${SignInImage})`}}>
                </div>
            </div>
        </div>
    )
}