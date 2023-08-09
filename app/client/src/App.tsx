import React from "react"
import Sign from "./Pages/Sign/Sign"
import Home from "./Pages/Home/Home"
import Profile from "./Pages/Profile/Profile"
import Friends from "./Pages/Friends/Friends"
import Prompt from "./Pages/Prompt/Prompt"
import Auth from "./Pages/Auth/Auth"
import "./scss/app.scss"
import logo from "./Assets/Icons/logo1.png"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

export default function App() {
    return (
        <Router>
            <img className="logo" src={logo} alt="logo" />
            {/* <p className="logo">PongLogo</p> */}
            <Routes>
                <Route path="/" element={<Sign />} />
                <Route path="/home" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/info" element={<Prompt />} />
            </Routes>
        </Router>
    )
} 