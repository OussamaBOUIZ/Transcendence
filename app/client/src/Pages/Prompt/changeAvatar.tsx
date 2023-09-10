import {User} from "../../../global/Interfaces"
import React, {useState} from 'react';
import { BsFillPenFill } from 'react-icons/bs';

export default function ChangeAvatar({ user, setImagePreview }: {user: User, setImagePreview: any}) {


  const [image, setImage] = useState<string | ArrayBuffer | null>(null)

  const handleFileChange = (event: { target: { files: FileList | null; }; }) => {
    if (event.target.files)
      setImagePreview(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target)
          setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
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
