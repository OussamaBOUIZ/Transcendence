import Sign from "./pages/Sign/Sign"
import Home from "./pages/Home/Home"
import Auth from "./pages/Auth/Auth"
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