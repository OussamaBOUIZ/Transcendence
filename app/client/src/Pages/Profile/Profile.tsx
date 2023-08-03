import "../../scss/home.scss";
import SideBar from "../../Components/Sidebar";
import ProfileComponent from "./ProfileComponent";
import { useFetchUserData } from "../../Hooks/useFetchUserData";

export default function Profile() {

  const { userData } = useFetchUserData();

  return (
    <div className="Home">
      <SideBar />
      <ProfileComponent UserData={userData} />
    </div>
  );
}
