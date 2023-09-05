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
                                <input type="text" name="" id="" value={user.username} 
                                className=' bg-red-200 w-1/2 rounded-md p-2'
                                />
                            </div>
                            <div className="fullname flex my-4  bg-yellow-300">
                                <h2 className='text-xl font-semibold w-1/2'>Full Name</h2>
                                <div className="inputs w-1/2 flex gap-4">
                                    <input type="text" name="firstname" id="" value={user.firstname} className=' w-1/2 bg-red-200 rounded-md p-2'/>
                                    <input type="text" name="lastname" id="" value={user.lastname} className=' w-1/2 bg-red-200 rounded-md p-2'/>
                                </div>
                            </div>
                        </div>
                        <button className='bg-pink-500 ml-10 px-6 py-8 self-center'>Update</button>
                    </form>
                </article>
            </div>
            <h2 className=' heading bg-blue-400'>Two Factor Authentication</h2>
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
            <div className="step_cards flex">
            <StepCard n={1}>
                <h2>Download Google Authenticator</h2>
                <p>Google Authenticator is available in the following app stores</p>
            </StepCard>
            <StepCard n={2}>
                <h2>Scan the QR code</h2>
                <p>Hold your camera at QR code</p>
            </StepCard>
            <StepCard n={3}>
                <h2>Enter your 2FA code</h2>
                <p>Please enter two factor token from Google Authenticator</p>
            </StepCard>
            </div>
        </section>
    );
}

