import "../../scss/home.scss";
import SideBar from "../../components/Sidebar";
import HomeCompenent from "./homeCompenent";
import UserOverview from "../../components/userOverview";
import { useFetchUserData } from "../../hooks/useFetchUserData";
import { getLeaders } from "../../hooks/getLeaders"

export default function Home() {

    const { userData } = useFetchUserData();
    const { leaders } = getLeaders();


  return (
    <div className="Home">
      <SideBar />
      <HomeCompenent UserData={userData} Leaders={leaders} />
      <UserOverview UserData={userData} />
    </div>
  );
}
