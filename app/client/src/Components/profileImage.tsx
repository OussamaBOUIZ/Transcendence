import "../scss/profileImage.scss"
import source from "../Assets/Icons/istockphoto-1356959038-612x612.jpg"

export default function ProfileImage({image, size}) {

    function handleClick() {
        window.location.replace('/profile')
    }
    return (
        <div onClick={handleClick} className={`profileImage ${size}`}>
            <div
            className="userImage"
            style={{backgroundImage: `url(${image})`}}
            ></div>
        </div>
    )
}