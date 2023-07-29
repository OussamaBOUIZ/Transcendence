import React from "react";
import "../../scss/home.scss";
import SideBar from "../../components/Sidebar";
import HomeCompenent from "./homeCompenent";
import UserOverview from "../../components/userOverview";
import { useFetchUserData } from "../../hooks/useFetchUserData";

export default function Home() {

    const { userData } = useFetchUserData();

  return (
    <div className="Home">
      <SideBar />
      <HomeCompenent UserData={userData} />
      <UserOverview UserData={userData} />
    </div>
  );
}
