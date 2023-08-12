import "../../scss/home.scss";
import SideBar from "../../Components/Sidebar";
import ProfileComponent from "./ProfileComponent";
import { getUserData } from "../../Hooks/getUserData";

export default function Profile() {

  const userData = getUserData();

  if (!userData) {
    return (
      <div className="Home">
      </div>
    );
  }
  
  return (
    <div className="Home">
      <ProfileComponent UserData={userData} />
    </div>
  );
}