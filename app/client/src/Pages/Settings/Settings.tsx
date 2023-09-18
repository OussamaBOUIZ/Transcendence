import React, { useContext, useState } from 'react'
import UserContext from '../../Context/UserContext';
import StepCard from '../../Components/StepCard';
import "../../scss/settings.scss"
import DownloadCard from '../../Components/DownloadCard';
import { BsFillPenFill } from 'react-icons/bs';
import { Data } from '../../../global/Interfaces';
import axios, { AxiosRequestConfig } from 'axios';
import { setFullName } from '../../Hooks/setFullName';
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';
import Loading from '../Loading';

export default function Settings () {

    const {user, navigate, setUpdate, setNotif} = useContext(UserContext)
    const [imgPrev, setimgPrev] = useState<string>("");
    const [image, setImage] = useState<string | null>(null)
    const [data, setData] = useState<Data>({firstname: "", lastname: "", username: ""})
    const [tfaStatus, setTfaStatus] = useState<boolean>(false);

        console.log(user)
    const updateUserNames = setFullName(setData);
    
    function checkInput(): boolean {
        if (data.firstname === '' || data.lastname === '' || data.username === '')
            return true;
        return false;
    }

    const handleImageChange = (event: { target: { files: any[]; }; }) => {
    console.log("event : ", event)
      const file = event.target.files[0];
      setimgPrev(file)
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleNamesEdit = (event) => {
        event.preventDefault()
        console.log("data : ", data)
        if (checkInput()) {
            console.log("one info is empty")
            return ;
        }
        const sendNames = async (path: string, userAllNames: Data | null , headers: AxiosRequestConfig<Data>) => {
            try {
                if (userAllNames) {
                    const res = await axios.put(path, userAllNames, headers);
                    setUpdate(prevVal => !prevVal)
                    if (res.data.length)
                        setNotif(res.data)
                }
            } catch (error: any) {
                console.log(error);
            }
        }
        let headers = {};
        headers = {
            'Content-Type': 'multipart/form-data',
        };
        sendNames(`/api/user/setUserNames/${user?.id}`, data, headers);
    }


    const handleImageUpload = () => {
        
        const sendImage = async (path: string, imageFile: FormData | null , headers: AxiosRequestConfig<FormData>) => {
            try {
                if (imageFile) {
                    await axios.put(path, imageFile, headers)
                    setUpdate(prevVal => !prevVal)
                }
            }
            catch (error: any) {
                console.log(error)
            }
        }
        let headers = {};
        headers = {
            'Content-Type': 'multipart/form-data',
        };
        let imgFormData: FormData | null  = new FormData();
        imgPrev ? imgFormData.append('image', imgPrev) : imgFormData = null
        sendImage(`/api/user/${user.id}/upload`, imgFormData, headers)
    }


    const handleEnable2FA = () => {
        
        const sendEnable = async (path: string) => {
            try {
                const res = await axios.get(path);
                console.log(`res: ${res}`)
                if(res.data.length !== 0)
                    navigate('/auth')
            } catch (error) {
                // console.log(error);
                
            }
        }
        if (tfaStatus)
            navigate('/disabletfa')
        else
            sendEnable(`/api/user/2fa/turn-on/${user?.id}`); 
    }
    
    const get2FAStatus =async () => {
        try {
            console.log("user", user)
            const res = await axios.get(`/api/user/2fa/isTurnedOn/${user?.id}`)
            console.log("res.data", res.data)
            setTfaStatus(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffectOnUpdate(() => {
        console.log("getting status")
        
        get2FAStatus();
    } , [user])
    
    if (user === undefined)
        return (<Loading />)

    return (
        
        <section className='settings_grid ml-8 rounded-lg overflow-hidden  mx-auto '>
            <div id="info_edit" className="px-8 py-10">
                <figure className='flex  items-center gap-16'>
                    <figcaption className=' px-6 py-8 '>
                        <h2 className='text-xl font-bold '>Your Avatar</h2>
                        <p className=''>This will be displayed on your profile</p>
                    </figcaption>
                    <div id='avatar_editor' className='relative mx-5'>
                        
                        <img src={ image || user.image} alt="default image" 
                            className='block w-32 h-32 fit-cover rounded-full  '
                        />
                         <div className="avatar-edit">
                            <input
                            type='file'
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleImageChange}
                            />
                            <label htmlFor="imageUpload"><BsFillPenFill className="icon" /></label>
                        </div>
                    </div>
                        <button className=' bg-pink-500 hover:bg-pink-600 py-2 px-8   rounded-md'
                            onClick={handleImageUpload}
                        >Update</button>
                </figure>
                <article className=''>
                    <form className=' p-10 flex'>
                        <div className="">
                            <div className="username flex my-4">
                                <h2 className='text-xl font-semibold w-1/2 items-center'>Username</h2>
                                <input type="text" name="username" id="" value={data.username} placeholder={user.username}
                                className=' bg-transparent text-white w-1/2 rounded-md p-2 border-gray-500 border-2'
                                onChange={updateUserNames}
                                />
                            </div>
                            <div className="fullname flex my-4  items-center ">
                                <h2 className='text-xl font-semibold w-1/2 '>Full Name</h2>
                                <div className="inputs w-1/2  flex gap-4">
                                    <input type="text" name="firstname" id="" value={data.firstname} placeholder={user.firstname} className=' w-1/2 bg-transparent text-white rounded-md p-2 border-gray-500 border-2 '
                                    onChange={updateUserNames}
                                    />
                                    <input type="text" name="lastname" id="" value={data.lastname} placeholder={user.lastname} className=' w-1/2 bg-transparent text-white rounded-md p-2 border-gray-500 border-2'
                                    onChange={updateUserNames}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='button-container'>
                            <button className='bg-pink-500 hover:bg-pink-600 ml-10 px-6 py-8 rounded-md '
                                onClick={handleNamesEdit}
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </article>
            </div>
            <div id="tfa-heading" className="heading  px-10 py-5">
                <h2 className='text-xl font-semibold mx-8'>Two Factor Authentication</h2>
            </div>
            <div id='twof-poster' className=" flex flex-col justify-center  gap-14  text-center bg-purple-600 py-32  rounded-2xl w-72 mx-auto
                hover:bg-purple-500 cursor-pointer"
            onClick={handleEnable2FA}
            >
                <article className='flex flex-col items-center'>
                    <h2 className='text-2xl  font-bold'>{tfaStatus ? "Disable" : "Enable"} </h2>
                    <h2 className='text-2xl   font-bold'>Two-Factor Authentication</h2>
                    <p className='mt-10 mx-18'>{tfaStatus ? "Remove Authentication" : "Authenticate your account"}</p>
                </article>
                <figure className='flex justify-center items-center'>
                    <img src="../../../src/Assets/phone3d.png" alt="" 
                    className=' w-56 '/>
                </figure>
            </div>
            <div id="step_cards" className=" flex px-14 py-2 gap-10">
            <StepCard n={1} heading="Download Google Authenticator" text="Google Authenticator is available in the following app stores">
                <DownloadCard image='../../../src/Assets/appstore.png' store='App Store' link="https://apps.apple.com/us/app/google-authenticator/id388497605"/>
                <DownloadCard image='../../../src/Assets/playstore.png' store='Google Play' link="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US&pli=1"/>
                </StepCard>
            <StepCard n={2} heading="Scan the QR code" text="Hold your camera at QR code">
            <div className="mt-6 flex justify-center items-center">
                <img src="../../../src/Assets/qrcode.png" alt="step card image"
                    className=' w-44 qr-img'
                    />
            </div>
                </StepCard>
            <StepCard n={3} heading="Enter your 2FA code" text="Enter two factor token from Google Authenticator">
            <div className=" flex justify-center items-center py-8 -mt-8">
                <img src="../../../src/Assets/password.png" alt="step card image" 
                    className=' h-44 pass-img'
                    />
            </div>
                </StepCard>
            </div>
        </section>
    );
}

