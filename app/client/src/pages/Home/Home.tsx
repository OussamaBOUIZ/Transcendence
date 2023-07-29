import React, {useEffect} from "react"
import {useState} from "react"
import axios from "axios"
import "../../scss/home.scss";
import SideBar from "../../components/Sidebar"
import HomeCompenent from "./homeCompenent";

export default function Home() {

    return (
        <div className="Home">
            <SideBar />
            <HomeCompenent />
        </div>
    )
}