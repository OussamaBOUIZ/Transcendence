import "../../scss/home.scss";
import SideBar from "../../Components/Sidebar";
import ProfileComponent from "./ProfileComponent";
import { getUserData } from "../../Hooks/getUserData";

export default function Profile() {

  const { userData } = getUserData();

  return (
    <div className="Home">
      <SideBar />
      <ProfileComponent UserData={userData} />
    </div>
  );
}
