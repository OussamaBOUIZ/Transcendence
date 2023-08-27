import "../../scss/home.scss";
import ProfileComponent from "./ProfileComponent";
import { useContext } from "react";
import UserContext from "../../Context/UserContext";

export default function Profile() {

  const {user} = useContext(UserContext)

  if (!user) {
    return (
      <div className="Home">
      </div>
    );
  }
  
  return (
    <div className="Home">
      <ProfileComponent UserData={user} />
    </div>
  );
}