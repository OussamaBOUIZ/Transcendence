// import Notification from "../../Components/Notification"
import {User, Data} from "../../../../global/Interfaces"

export default function fullName({fullName, user, handleChange} : {fullName: Data, user: User, handleChange: any}) {

  return (
    <>
        <p>Full Name</p>
        <div className="inputs">
          <div className="field">
            <label>First Name</label>
            <input
              placeholder={user.firstname}
              type="text"
              name="firstname"
              value={fullName.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input
              placeholder={user.lastname}
              type="text"
              name="lastname"
              value={fullName.lastname}
              onChange={handleChange}
            />
          </div>
        </div>
    </>
  );
}