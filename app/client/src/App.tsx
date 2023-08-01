import Sign from "./Pages/Sign/Sign"
import Home from "./Pages/Home/Home"
import Auth from "./Pages/Auth/Auth"
import "./scss/app.scss"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

export default function App() {
    return (
        <Router>
            <p className="logo">PongLogo</p>
            <Routes>
                <Route path="/" element={<Sign />} />
                <Route path="/home" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </Router>
    )
}