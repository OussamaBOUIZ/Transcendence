import React, { useContext } from 'react'
import UserContext from '../../Context/UserContext';
import StepCard from '../../Components/StepCard';
import "../../scss/settings.css"
import DownloadCard from '../../Components/DownloadCard';

export default function Settings () {
    const {user} = useContext(UserContext)

    return (
        
        <section className='settings_grid ml-8rounded-lg overflow-hidden mx-auto'>
            <div className="info_edit px-8 py-10">
                <figure className='flex  items-center gap-16 lg:gap-0'>
                    <figcaption className=' px-6 py-8 lg:px-0'>
                        <h2 className='text-xl font-bold'>Your Avatar</h2>
                        <p className=' xl:text-sm'>This will be displayed on your profile</p>
                    </figcaption>
                    <div id='avatar-editor' className='relative mx-5 lg:mx-0'>
                        <img src="../../../src/Assets/default.jpg" alt="default image" 
                            className='block w-32 h-32 xl:w-auto fit-cover rounded-full'
                        />
                        <button className=' rounded-full bg-white p-1 absolute bottom-0 right-1 xl:-right-2'>
                        <img width="23" height="23" src="https://img.icons8.com/ios-glyphs/30/ball-point-pen.png" alt="ball-point-pen"/>
                        </button>
                    </div>
                        <button className=' bg-pink-500 hover:bg-pink-600 py-2 px-8 lg:px-4 lg:ml-4 rounded-md'>update</button>
                </figure>
                <article>
                    <form className=' p-10 flex lg:p-0 lg:flex-wrap'>
                        <div className="">
                            <div className="username flex my-4">
                                <h2 className='text-xl font-semibold w-1/2 items-center'>Username</h2>
                                <input type="text" name="" id="" value="oouazize" 
                                className=' bg-transparent text-white w-1/2 rounded-md p-2 border-gray-500 border-2 xl:w-2/3'
                                />
                            </div>
                            <div className="fullname flex my-4 items-center">
                                <h2 className='text-xl font-semibold w-1/2'>Full Name</h2>
                                <div className="inputs w-1/2 xl:w-2/3 flex gap-4 xl:gap-2">
                                    <input type="text" name="firstname" id="" value="oussama" className=' w-1/2 bg-transparent text-white rounded-md p-2 border-gray-500 border-2'/>
                                    <input type="text" name="lastname" id="" value="ouaziz" className=' w-1/2 bg-transparent text-white rounded-md p-2 border-gray-500 border-2'/>
                                </div>
                            </div>
                        </div>
                        <button className='bg-pink-500 hover:bg-pink-600 ml-10 px-6 py-8 lg:py-4 lg:items-center rounded-md lg:basis-2/3 lg:ml-44'>
                            <img width="50" height="50" src="https://img.icons8.com/fluency/48/save.png" alt="save" className='lg:hidden'/>
                            <span className='hidden lg:inline'>Update</span>
                        </button>
                    </form>
                </article>
            </div>
            <div className="heading  px-10 py-5">
                <h2 className='text-xl font-semibold mx-8'>Two Factor Authentication</h2>
            </div>
            <div className="twof-poster flex flex-col gap-14 xl:gap-0 text-center bg-purple-600 py-32 xl:py-16 rounded-2xl w-72 mx-auto xl:mx-6 lg:ml-14">
                <article className='flex flex-col items-center'>
                    <h2 className='text-2xl xl:text-xl font-bold'>Enable </h2>
                    <h2 className='text-2xl xl:text-xl xl: w-1/2 font-bold'>Two-Factor Authentication</h2>
                    <p className='mt-10 xl:mt-6 w-1/2 mx-18'>Authenticate your account</p>
                </article>
                <figure className='flex justify-center items-center'>
                    <img src="../../../src/Assets/phone3d.png" alt="" 
                    className=' w-56 xl:w-36'/>
                </figure>
            </div>
            <div className="step_cards flex px-14 xxl:pr-10 py-2 gap-10  xl:gap-4">
            <StepCard n={1} heading="Download Google Authenticator" text="Google Authenticator is available in the following app stores">
                <DownloadCard image='../../../src/Assets/appstore.png' store='App Store' link=''/>
                <DownloadCard image='../../../src/Assets/playstore.png' store='Google Play' link=''/>
                </StepCard>
            <StepCard n={2} heading="Scan the QR code" text="Hold your camera at QR code">
            <div className="mt-6 flex justify-center items-center">
                <img src="../../../src/Assets/qrcode.png" alt="step card image" 
                    className=' w-44'
                    />
            </div>
                </StepCard>
            <StepCard n={3} heading="Enter your 2FA code" text="Enter two factor token from Google Authenticator">
            <div className=" flex justify-center items-center py-8 -mt-8">
                <img src="../../../src/Assets/password.png" alt="step card image" 
                    className=' h-44 '
                    />
            </div>
                </StepCard>
            </div>
        </section>
    );
}

