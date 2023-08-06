import "../../scss/home.scss";
import SideBar from "../../Components/Sidebar";
import HomeCompenent from "./homeCompenent";
import UserOverview from "../../Components/userOverview";
import { getUserData } from "../../Hooks/getUserData";
import { getLeaders } from "../../Hooks/getLeaders"

export default function Home() {

    const { userData } = getUserData();
    const { leaders } = getLeaders();


  return (
    <div className="Home">
      <SideBar />
      <HomeCompenent UserData={userData} Leaders={leaders} />
      <UserOverview UserData={userData} />
    </div>
  );
}
