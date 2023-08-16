import {User} from "../../../../global/Interfaces"
import React, {useState} from 'react';
import { BsFillPenFill } from 'react-icons/bs';
import { getUserData } from "../../Hooks/getUserData";

export default function ChangeAvatar({ user, imagePreview, setImagePreview }: {user: User, imagePreview: string | null, setImagePreview: any}) {


  const [image, setImage] = useState<string | null>(null)

  const handleFileChange = (event: { target: { files: any[]; }; }) => {
    const file = event.target.files[0];
    setImagePreview(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <p className="text-3xl lg:text-5xl md:text-4xl">Enter Your Avatar</p>
      <div className="avatar-upload">
        <div className="avatar-edit">
            <input
              type='file'
              id="imageUpload"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label htmlFor="imageUpload"><BsFillPenFill className="icon" /></label>
        </div>
        <div className="avatar-preview">
        <div
          id="imagePreview"
          style={{
            backgroundImage: `url(${image || user.image})`,
          }}
        ></div>
        </div>
      </div>
    </div>
  );
}
