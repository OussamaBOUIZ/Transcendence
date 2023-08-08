import React from "react"
import Home from "./components/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Sign from "./Pages/Sign/Sign"

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Sign />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    )
} 