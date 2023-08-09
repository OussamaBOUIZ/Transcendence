// import Notification from "../../Components/Notification"
import {User, Data} from "../../../../global/Interfaces"

export default function fullName({fullName, user, handleChange} : {fullName: Data, user: User, handleChange: any}) {

  return (
    <>
        <p>Full Name</p>
        <div className="inputs">
            <input
              placeholder="First Name"
              type="text"
              name="firstname"
              value={fullName.firstname}
              onChange={handleChange}
            />
            <input
              placeholder="Last Name"
              type="text"
              name="lastname"
              value={fullName.lastname}
              onChange={handleChange}
            />
        </div>
    </>
  );
}