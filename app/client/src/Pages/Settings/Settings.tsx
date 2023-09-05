import React, { useContext } from 'react'
import UserContext from '../../Context/UserContext';
import StepCard from '../../Components/StepCard';

export default function Settings () {
    const {user} = useContext(UserContext)

    return (
        <section id="settings_container" className=' bg-amber-600'>
            <div className="info_edit bg-red-400">
                <figure className=''>
                    <figcaption>
                        <h2>Your Avatar</h2>
                        <p>This will be displayed on your profile</p>
                    </figcaption>
                    <div id='avatar-editor'>
                        <img src="" alt="" 
                            className='w-5 h-5'
                        />
                        <button>Edit</button>
                    </div>
                    <button>update</button>
                </figure>
                <article>
                    <form>
                        <div className="username">
                            <h2>import React from 'react'


export default function Settings () {
    return (
        <h1>Settings Page</h1>
    );
}ut type="text" name="" id="" value={user.username} className=' bg-transparent'/>
                        </div>
                        <div className="fullname">
                            <h2>Full Name</h2>
                            <input type="text" name="firstname" id="" value={user.firstname} className=' bg-transparent'/>
                            <input type="text" name="lastname" id="" value={user.lastname} className=' bg-transparent'/>
                        </div>
                    </form>
                    <div className="action">
                        <button>Update</button>
                    </div>
                </article>
            </div>
            <h2 className='bg-blue-400'>Two Factor Authentication</h2>
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
        </section>
    );
}

