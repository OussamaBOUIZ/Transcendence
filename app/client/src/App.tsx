import React from "react"
import Sign from "./components/Sign/Sign"
import Home from "./components/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

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