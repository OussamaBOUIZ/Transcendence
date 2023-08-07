import "../scss/profileImage.scss"
import source from "../Assets/Icons/istockphoto-1356959038-612x612.jpg"
// import image from "../Assets/Icons/fire-shield.jpg"


export default function ProfileImage({image, id, size}) {

    if (image !== undefined) {
        return (
            <div className={`profileImage ${size}`}>
                <div
                className="userImage"
                style={{backgroundImage: `url(${image})`}}
                ></div>
            </div>
        )
    }
      return (
        <div className={`profileImage ${size}`}>
            <div
            className="userImage"
            style={{backgroundImage: `url(${source})`}}
            ></div>
        </div>
    )
}