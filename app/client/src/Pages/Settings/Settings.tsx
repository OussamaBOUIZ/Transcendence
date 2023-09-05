import React, { useContext } from 'react'
import UserContext from '../../Context/UserContext';
import StepCard from '../../Components/StepCard';
import "../../scss/settings.css"

export default function Settings () {
    const {user} = useContext(UserContext)

    return (
        <section className='settings_container ml-8 bg-amber-600 rounded-lg overflow-hidden'>
            <div className="info_edit bg-red-400 px-8 py-10">
                <figure className='flex items-center'>
                    <figcaption className='bg-red-200 px-6 py-8'>
                        <h2 className='text-xl font-bold'>Your Avatar</h2>
                        <p>This will be displayed on your profile</p>
                    </figcaption>
                    <div id='avatar-editor' className='relative mx-5'>
                        <img src="../../../src/Assets/default.jpg" alt="default image" 
                            className='block w-32 h-32 fit-cover rounded-full '
                        />
                        <button className=' rounded-full bg-white p-1 absolute bottom-0 right-1'>
                        <img width="23" height="23" src="https://img.icons8.com/ios-glyphs/30/ball-point-pen.png" alt="ball-point-pen"/>
                        </button>
                    </div>
                        <button className='bg-pink-500 py-2 px-8 rounded-3xl'>update</button>
                </figure>
                <article>
                    <form className='bg-green-400 p-10 flex'>
                        <div className="">
                            <div className="username flex my-4">
                                <h2 className='text-xl font-semibold w-1/2'>Username</h2>
                                <input type="text" name="" id="" value="oouazize" 
                                className=' bg-transparent text-white w-1/2 rounded-md p-2 border-gray-500 border-2'
                                />
                            </div>
                            <div className="fullname flex my-4">
                                <h2 className='text-xl font-semibold w-1/2'>Full Name</h2>
                                <div className="inputs w-1/2 flex gap-4">
                                    <input type="text" name="firstname" id="" value="oussama" className=' w-1/2 bg-transparent text-white rounded-md p-2 border-gray-500 border-2'/>
                                    <input type="text" name="lastname" id="" value="ouaziz" className=' w-1/2 bg-transparent text-white rounded-md p-2 border-gray-500 border-2'/>
                                </div>
                            </div>
                        </div>
                        <button className='bg-pink-500 ml-10 px-6 py-8 self-center rounded-md'>Update</button>
                    </form>
                </article>
            </div>
            <div className="heading bg-blue-400 px-10 py-5">
                <h2 className='text-xl font-semibold mx-8'>Two Factor Authentication</h2>
            </div>
            <div className="twof-poster bg-purple-500">
                <article>
                    <h2>Enable</h2>
                    <h2>Two-Factor</h2>
                    <h2>Authentication</h2>
                    <p>Authenticate your account</p>
                </article>
                <figure>
                    <img src="" alt="" />
                </figure>
            </div>
            <div className="step_cards flex px-14 py-2 gap-10">
            <StepCard n={1} heading="Download Google Authenticator" text="Google Authenticator is available in the following app stores">
            <div className="bg-orange-400 mt-6">
                <img src="" alt="step card image" 
                    className=' h-auto'
                    />
            </div>
                </StepCard>
            <StepCard n={1} heading="Scan the QR code" text="Hold your camera at QR code">
            <div className="bg-orange-400 mt-6">
                <img src="" alt="step card image" 
                    className=' h-auto'
                    />
            </div>
                </StepCard>
            <StepCard n={1} heading="Enter your 2FA code" text="Please enter two factor token from Google Authenticator">
            <div className="bg-orange-400 mt-6">
                <img src="" alt="step card image" 
                    className=' h-auto'
                    />
            </div>
                </StepCard>
            {/* <StepCard n={2}>
                <h2>Scan the QR code</h2>
                <p></p>
            </StepCard>
            <StepCard n={3}>
                <h2>Enter your 2FA code</h2>
                <p>Please enter two factor token from Google Authenticator</p>
            </StepCard> */}
            </div>
        </section>
    );
}

