import React, {useContext, useEffect} from 'react'

import UserContext from '../../Context/UserContext';
import ProfileImage from '../../Components/profileImage';
import { User } from '../../../global/Interfaces';
import { getUserImage } from '../../Hooks/getUserImage';
import { Persentage } from './Interfaces';

export default function PowerBar({ right, isHost, oppUser, persentage}: {right: boolean, isHost: boolean, oppUser: User, persentage: Persentage}) {
    const {user} = useContext(UserContext);

    useEffect(() => {
        
        const fetchOppImage = async () => {
            try {
                const image = await getUserImage(oppUser.id);
                oppUser.image = image;
            } catch (err) {}
        }
        void fetchOppImage();
    }, [])

    return (
        right ? 
        <div className='svg-container relative flex items-center w-1/2'>
            <ProfileImage image={user.image} name={user.username} size='big' />
            <svg width="80%" viewBox="0 0 315 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1304_404)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M298.793 55.7609C298.646 56.0913 298.317 56.3116 297.951 56.3116H215.707L209.049 63.0293H278.781C279.146 62.0748 280.061 61.3774 281.159 61.3774C282.585 61.3774 283.72 62.5521 283.72 63.947C283.72 65.3786 282.585 66.5166 281.159 66.5166C280.061 66.5166 279.146 65.8559 278.781 64.9014H207.146L202.5 69.5634C202.354 69.747 202.098 69.8204 201.878 69.8204H60.5854C60.3293 69.8204 60.1098 69.747 59.9269 69.5634L34.8293 44.3812H20.5244C20.1586 44.3812 19.8293 44.1609 19.683 43.7938C19.5366 43.4634 19.6098 43.0597 19.8659 42.8027L56.6342 5.91028C56.8171 5.72674 57.0366 5.65332 57.2927 5.65332H102.293C102.549 5.65332 102.768 5.76345 102.951 5.94699L121.646 25.8799H269.415C269.671 25.8799 269.89 25.9533 270.073 26.1369L298.61 54.7698C298.866 55.0267 298.939 55.4305 298.793 55.7609ZM295.756 54.4761L269.049 27.7153H121.244C121.024 27.7153 120.768 27.6052 120.585 27.4217L101.89 7.48876H67.8659L50.5244 24.8521C49.7562 25.6596 48.6952 26.1002 47.5976 26.1002H39.1098L22.7196 42.5457H35.1952C35.4513 42.5457 35.6708 42.6191 35.8537 42.8027L41.744 48.7128H58.1708C59.6342 48.7128 61.0244 49.3002 62.0488 50.328L66.9147 55.1736C67.9391 56.2381 69.3293 56.7888 70.7927 56.7888H164.268C165.732 56.7888 167.122 57.3761 168.146 58.404L177.732 67.985H201.476L214.683 54.7698C214.866 54.5862 215.085 54.4761 215.342 54.4761H295.756Z" fill="url(#paint0_linear_1304_404)"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M298.793 55.7609C298.646 56.0913 298.317 56.3116 297.951 56.3116H215.707L209.049 63.0293H278.781C279.146 62.0748 280.061 61.3774 281.159 61.3774C282.585 61.3774 283.72 62.5521 283.72 63.947C283.72 65.3786 282.585 66.5166 281.159 66.5166C280.061 66.5166 279.146 65.8559 278.781 64.9014H207.146L202.5 69.5634C202.354 69.747 202.098 69.8204 201.878 69.8204H60.5854C60.3293 69.8204 60.1098 69.747 59.9269 69.5634L34.8293 44.3812H20.5244C20.1586 44.3812 19.8293 44.1609 19.683 43.7938C19.5366 43.4634 19.6098 43.0597 19.8659 42.8027L56.6342 5.91028C56.8171 5.72674 57.0366 5.65332 57.2927 5.65332H102.293C102.549 5.65332 102.768 5.76345 102.951 5.94699L121.646 25.8799H269.415C269.671 25.8799 269.89 25.9533 270.073 26.1369L298.61 54.7698C298.866 55.0267 298.939 55.4305 298.793 55.7609ZM295.756 54.4761L269.049 27.7153H121.244C121.024 27.7153 120.768 27.6052 120.585 27.4217L101.89 7.48876H67.8659L50.5244 24.8521C49.7562 25.6596 48.6952 26.1002 47.5976 26.1002H39.1098L22.7196 42.5457H35.1952C35.4513 42.5457 35.6708 42.6191 35.8537 42.8027L41.744 48.7128H58.1708C59.6342 48.7128 61.0244 49.3002 62.0488 50.328L66.9147 55.1736C67.9391 56.2381 69.3293 56.7888 70.7927 56.7888H164.268C165.732 56.7888 167.122 57.3761 168.146 58.404L177.732 67.985H201.476L214.683 54.7698C214.866 54.5862 215.085 54.4761 215.342 54.4761H295.756Z" fill="#E72FD0"/>
                    <path d="M47.2319 29.7711H40.2807L31.2075 38.8749H34.8295C36.0368 38.8749 37.2075 39.3521 38.049 40.1964L42.8782 45.0419H57.8051C60.2563 45.0419 62.5612 45.9964 64.2807 47.7217L69.1465 52.604C69.4758 52.9343 69.9148 53.1179 70.427 53.1179H163.903C166.354 53.1179 168.659 54.0723 170.378 55.7976L178.866 64.3141H199.61L211.72 52.1635C212.598 51.2825 213.732 50.8052 214.976 50.8052H286.537L267.183 31.3862H120.878C119.634 31.3862 118.427 30.8356 117.549 29.9179L99.9514 11.1597H69.0002L52.7563 27.4584C51.2929 28.9268 49.3173 29.7711 47.2319 29.7711Z" fill="#701CC5"/>
                    <path d="M47.2319 29.7711H40.2807L31.2075 38.8749H34.8295C36.0368 38.8749 37.2075 39.3521 38.049 40.1964L42.8782 45.0419H57.8051C60.2563 45.0419 62.5612 45.9964 64.2807 47.7217L69.1465 52.604C69.4758 52.9343 69.9148 53.1179 70.427 53.1179H163.903C166.354 53.1179 168.659 54.0723 170.378 55.7976L178.866 64.3141H199.61L211.72 52.1635C212.598 51.2825 213.732 50.8052 214.976 50.8052H286.537L267.183 31.3862H120.878C119.634 31.3862 118.427 30.8356 117.549 29.9179L99.9514 11.1597H69.0002L52.7563 27.4584C51.2929 28.9268 49.3173 29.7711 47.2319 29.7711Z" fill="url(#paint1_linear_1304_404)"/>
                    <path d="M235.902 59.2115L220.207 59.1748C219.914 59.1748 219.695 59.2849 219.475 59.4685L210.475 68.0951C209.817 68.7191 210.256 69.8204 211.171 69.8204H226.866C227.158 69.8204 227.378 69.747 227.597 69.5634L236.597 60.9368C237.256 60.3128 236.817 59.1748 235.902 59.1748V59.2115Z" fill="#BE00C0"/>
                    <path d="M260.232 59.2115L244.537 59.1748C244.244 59.1748 244.025 59.2849 243.805 59.4685L234.805 68.0951C234.146 68.7191 234.585 69.8204 235.5 69.8204H251.195C251.488 69.8204 251.707 69.747 251.927 69.5634L260.927 60.9368C261.585 60.3128 261.146 59.1748 260.232 59.1748V59.2115Z" fill="#BE00C0"/>
                </g>
                <defs>
                    <linearGradient id="paint0_linear_1304_404" x1="14987.3" y1="994.213" x2="228155" y2="994.213" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#C100B1"/>
                        <stop offset="1" stopColor="#2D0093"/>per
                    </linearGradient>
                    <linearGradient id="paint1_linear_1304_404" x1="32" y1="38" x2={32+(287 - 32) * (isHost ? persentage.oppPersentage : persentage.myPersentage) / 100} y2="38" gradientUnits="userSpaceOnUse">
                        <stop offset="0.9999" stopColor="#FD40D0"/>
                        <stop offset="1" stopColor="#FD40D0" stopOpacity="0"/>
                    </linearGradient>
                    <clipPath id="clip0_1304_404">
                        <rect fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </div>
        : <div className='svg-container relative flex flex-row-reverse items-center w-1/2'>
            <ProfileImage image={oppUser?.image} name={oppUser?.username} size="big" />
            <svg viewBox="0 0 315 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.2073 55.7609C16.3536 56.0913 16.6829 56.3115 17.0487 56.3115H99.2926L105.951 63.0293H36.2195C35.8536 62.0748 34.939 61.3774 33.8414 61.3774C32.4146 61.3774 31.2804 62.5521 31.2804 63.947C31.2804 65.3786 32.4146 66.5166 33.8414 66.5166C34.939 66.5166 35.8536 65.8559 36.2195 64.9014H107.854L112.5 69.5635C112.646 69.747 112.902 69.8204 113.122 69.8204H254.415C254.671 69.8204 254.89 69.747 255.073 69.5635L280.171 44.3812H294.476C294.841 44.3812 295.171 44.1609 295.317 43.7938C295.463 43.4634 295.39 43.0596 295.134 42.8027L258.366 5.91028C258.183 5.72674 257.963 5.65332 257.707 5.65332H212.707C212.451 5.65332 212.232 5.76345 212.049 5.94699L193.354 25.8799H45.5853C45.3292 25.8799 45.1097 25.9533 44.9268 26.1369L16.3902 54.7698C16.1341 55.0267 16.0609 55.4305 16.2073 55.7609ZM19.2439 54.4761L45.9512 27.7153H193.756C193.976 27.7153 194.232 27.6052 194.415 27.4217L213.11 7.48876H247.134L264.476 24.8521C265.244 25.6596 266.305 26.1002 267.402 26.1002H275.89L292.28 42.5457H279.805C279.549 42.5457 279.329 42.6191 279.146 42.8027L273.256 48.7128H256.829C255.366 48.7128 253.976 49.3002 252.951 50.328L248.085 55.1736C247.061 56.2381 245.671 56.7888 244.207 56.7888H150.732C149.268 56.7888 147.878 57.3761 146.854 58.404L137.268 67.985H113.524L100.317 54.7698C100.134 54.5862 99.9146 54.4761 99.6585 54.4761H19.2439Z" fill="url(#paint0_linear_1304_1046)"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M16.2073 55.7609C16.3536 56.0913 16.6829 56.3115 17.0487 56.3115H99.2926L105.951 63.0293H36.2195C35.8536 62.0748 34.939 61.3774 33.8414 61.3774C32.4146 61.3774 31.2804 62.5521 31.2804 63.947C31.2804 65.3786 32.4146 66.5166 33.8414 66.5166C34.939 66.5166 35.8536 65.8559 36.2195 64.9014H107.854L112.5 69.5635C112.646 69.747 112.902 69.8204 113.122 69.8204H254.415C254.671 69.8204 254.89 69.747 255.073 69.5635L280.171 44.3812H294.476C294.841 44.3812 295.171 44.1609 295.317 43.7938C295.463 43.4634 295.39 43.0596 295.134 42.8027L258.366 5.91028C258.183 5.72674 257.963 5.65332 257.707 5.65332H212.707C212.451 5.65332 212.232 5.76345 212.049 5.94699L193.354 25.8799H45.5853C45.3292 25.8799 45.1097 25.9533 44.9268 26.1369L16.3902 54.7698C16.1341 55.0267 16.0609 55.4305 16.2073 55.7609ZM19.2439 54.4761L45.9512 27.7153H193.756C193.976 27.7153 194.232 27.6052 194.415 27.4217L213.11 7.48876H247.134L264.476 24.8521C265.244 25.6596 266.305 26.1002 267.402 26.1002H275.89L292.28 42.5457H279.805C279.549 42.5457 279.329 42.6191 279.146 42.8027L273.256 48.7128H256.829C255.366 48.7128 253.976 49.3002 252.951 50.328L248.085 55.1736C247.061 56.2381 245.671 56.7888 244.207 56.7888H150.732C149.268 56.7888 147.878 57.3761 146.854 58.404L137.268 67.985H113.524L100.317 54.7698C100.134 54.5862 99.9146 54.4761 99.6585 54.4761H19.2439Z" fill="#E72FD0"/>
                <path d="M267.769 29.7711H274.72L283.793 38.8749H280.171C278.964 38.8749 277.793 39.3521 276.952 40.1964L272.122 45.0419H257.195C254.744 45.0419 252.439 45.9964 250.72 47.7217L245.854 52.604C245.525 52.9343 245.086 53.1179 244.573 53.1179H151.098C148.647 53.1179 146.342 54.0723 144.622 55.7976L136.134 64.3141H115.391L103.281 52.1635C102.403 51.2825 101.269 50.8052 100.025 50.8052H28.4637L47.8173 31.3862H194.122C195.366 31.3862 196.573 30.8356 197.452 29.9179L215.049 11.1597H246L262.244 27.4584C263.708 28.9268 265.683 29.7711 267.769 29.7711Z" fill="#701CC5"/>
                <path d="M267.769 29.7711H274.72L283.793 38.8749H280.171C278.964 38.8749 277.793 39.3521 276.952 40.1964L272.122 45.0419H257.195C254.744 45.0419 252.439 45.9964 250.72 47.7217L245.854 52.604C245.525 52.9343 245.086 53.1179 244.573 53.1179H151.098C148.647 53.1179 146.342 54.0723 144.622 55.7976L136.134 64.3141H115.391L103.281 52.1635C102.403 51.2825 101.269 50.8052 100.025 50.8052H28.4637L47.8173 31.3862H194.122C195.366 31.3862 196.573 30.8356 197.452 29.9179L215.049 11.1597H246L262.244 27.4584C263.708 28.9268 265.683 29.7711 267.769 29.7711Z" fill="url(#paint1_linear_1304_1046)"/>
                <path d="M79.0973 59.2115L94.7924 59.1748C95.0851 59.1748 95.3046 59.2849 95.5241 59.4685L104.524 68.0951C105.183 68.7191 104.744 69.8204 103.829 69.8204H88.1339C87.8412 69.8204 87.6217 69.747 87.4022 69.5634L78.4022 60.9368C77.7436 60.3128 78.1826 59.1748 79.0973 59.1748V59.2115Z" fill="#BE00C0"/>
                <path d="M54.7682 59.2115L70.4633 59.1748C70.756 59.1748 70.9755 59.2849 71.195 59.4685L80.195 68.0951C80.8535 68.7191 80.4145 69.8204 79.4999 69.8204H63.8048C63.5121 69.8204 63.2926 69.747 63.0731 69.5634L54.0731 60.9368C53.4145 60.3128 53.8535 59.1748 54.7682 59.1748V59.2115Z" fill="#BE00C0"/>
                <defs>
                    <linearGradient id="paint0_linear_1304_1046" x1="-14672.3" y1="994.213" x2="-227840" y2="994.213" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#C100B1"/>
                        <stop offset="1" stopColor="#2D0093"/>number
                    </linearGradient>
                    <linearGradient id="paint1_linear_1304_1046" x1="283" y1="38" x2={283+(28 - 283) * (isHost ? persentage.myPersentage : persentage.oppPersentage) / 100} y2="38" gradientUnits="userSpaceOnUse">
                        <stop offset="0.9999" stopColor="#FD40D0"/>
                        <stop offset="1" stopColor="#FD40D0" stopOpacity="0"/>
                    </linearGradient>
                </defs>
            </svg>
        </div>
    )
}
