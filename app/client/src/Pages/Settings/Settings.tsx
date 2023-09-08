import React, { useContext } from 'react'
import UserContext from '../../Context/UserContext';
import StepCard from '../../Components/StepCard';
import "../../scss/settings.css"
import DownloadCard from '../../Components/DownloadCard';

export default function Settings () {

    const {user} = useContext(UserContext)

    return (
        
        <section className='settings_grid ml-8rounded-lg overflow-hidden med:overflow-scroll mx-auto'>
            <div className="info_edit px-8 py-10 lrg:pr-0">
                <figure className='flex  items-center gap-16 lrg:gap-0 med:gap-10  med:flex-col  med:mb-20'>
                    <figcaption className=' px-6 py-8 lrg:px-0 lrg:ml-8 med:mb-8'>
                        <h2 className='text-xl font-bold med:text-3xl med:text-center'>Your Avatar</h2>
                        <p className=' xlg:text-sm med:text-center med:text-2xl'>This will be displayed on your profile</p>
                    </figcaption>
                    <div id='avatar-editor' className='relative mx-5 lrg:mx-0 med:mb-8'>
                        <img src="../../../src/Assets/default.jpg" alt="default image" 
                            className='block w-32 h-32 xlg:w-auto fit-cover rounded-full  '
                        />
                        <button className=' rounded-full bg-white p-1 absolute bottom-0 right-1 xlg:-right-2'>
                        <img width="23" height="23" src="https://img.icons8.com/ios-glyphs/30/ball-point-pen.png" alt="ball-point-pen"/>
                        </button>
                    </div>
                        <button className=' bg-pink-500 hover:bg-pink-600 py-2 px-8 lrg:px-4 lrg:ml-4 rounded-md'>update</button>
                </figure>
                <article className='med:mx-8'>
                    <form className=' p-10 flex lrg:p-0 lrg:flex-wrap med:flex-col'>
                        <div className="">
                            <div className="username flex med:flex-col  my-4 lrg:ml-8 med:mb-10">
                                <h2 className='text-xl font-semibold w-1/2 items-center med:mb-6'>Username</h2>
                                <input type="text" name="" id="" value="oouazize" 
                                className=' bg-transparent text-white w-1/2 rounded-md p-2 border-gray-500 border-2 xlg:w-2/3 med:w-full med:py-4'
                                />
                            </div>
                            <div className="fullname flex my-4 med:flex-col  items-center lrg:ml-8 ">
                                <h2 className='text-xl font-semibold w-1/2 med:w-full med:mb-6'>Full Name</h2>
                                <div className="inputs w-1/2 xlg:w-2/3 flex med:flex-col gap-4 xlg:gap-2 med:w-full">
                                    <input type="text" name="firstname" id="" value="oussama" className=' w-1/2 bg-transparent text-white rounded-md p-2 border-gray-500 border-2 med:w-full med:py-4'/>
                                    <input type="text" name="lastname" id="" value="ouaziz" className=' w-1/2 bg-transparent text-white rounded-md p-2 border-gray-500 border-2 med:w-full med:py-4'/>
                                </div>
                            </div>
                        </div>
                        <button className='bg-pink-500 hover:bg-pink-600 ml-10 px-6 py-8 med:py-4 lrg:py-4 lrg:items-center rounded-md lrg:basis-72 lrg:ml-auto med:mx-auto med:!basis-auto'>
                            <img width="50" height="50" src="https://img.icons8.com/fluency/48/save.png" alt="save" className='lrg:hidden med:hidden'/>
                            <span className='hidden lrg:inline med:inline'>Update</span>
                        </button>
                    </form>
                </article>
            </div>
            <div className="heading  px-10 py-5">
                <h2 className='text-xl font-semibold mx-8 med:text-center'>Two Factor Authentication</h2>
            </div>
            <div className="twof-poster flex flex-col med:flex-row med:mx-auto  gap-14 xlg:gap-0 text-center bg-purple-600 py-32 xlg:py-16 rounded-2xl w-72 mx-auto xlg:mx-6 lrg:ml-14
                lrg:w-52 lrg:mr-8 med:w-4/5 med:h-auto mxl:py-8 med:justify-center med:items-center
                hover:bg-purple-500 cursor-pointer
            ">
                <article className='flex flex-col items-center'>
                    <h2 className='text-2xl mxl:text-xl font-bold sml:text-lg'>Enable </h2>
                    <h2 className='text-2xl mxl:text-xl  font-bold med:text-lg'>Two-Factor Authentication</h2>
                    <p className='mt-10 mxl:mt-6 mxl:text-xs mx-18 med:mt-2'>Authenticate your account</p>
                </article>
                <figure className='flex justify-center items-center'>
                    <img src="../../../src/Assets/phone3d.png" alt="" 
                    className=' w-56 mxl:w-36 '/>
                </figure>
            </div>
            <div className="step_cards flex px-14 big:pr-10 py-2 gap-10  med:flex-col xlg:gap-4 med:w-4/5 med:mx-auto med:px-0 sml:gap-0">
            <StepCard n={1} heading="Download Google Authenticator" text="Google Authenticator is available in the following app stores">
                <DownloadCard image='../../../src/Assets/appstore.png' store='App Store' link=''/>
                <DownloadCard image='../../../src/Assets/playstore.png' store='Google Play' link=''/>
                </StepCard>
            <StepCard n={2} heading="Scan the QR code" text="Hold your camera at QR code">
            <div className="mt-6 flex justify-center items-center">
                <img src="../../../src/Assets/qrcode.png" alt="step card image"
                    className=' w-44  mxl:w-40'
                    />
            </div>
                </StepCard>
            <StepCard n={3} heading="Enter your 2FA code" text="Enter two factor token from Google Authenticator">
            <div className=" flex justify-center items-center py-8 -mt-8">
                <img src="../../../src/Assets/password.png" alt="step card image" 
                    className=' h-44 mxl:h-40'
                    />
            </div>
                </StepCard>
            </div>
        </section>
    );
}

