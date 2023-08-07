

export default function StarRank( { RankNumber }) {

    const Star = <svg xmlns="http://www.w3.org/2000/svg" width="43" height="42" viewBox="0 0 43 42" fill="none">
    <g filter="url(#filter0_d_240_120)">
      <path d="M18.6483 4.72945C19.5492 1.97155 23.4508 1.97156 24.3517 4.72945L26.844 12.3589C27.2471 13.5926 28.3978 14.4273 29.6957 14.4273L37.7266 14.4273C40.6367 14.4273 41.8424 18.1544 39.4837 19.8588L33.0145 24.5338C31.9573 25.2977 31.5149 26.6571 31.9199 27.8969L34.3975 35.4811C35.2995 38.2422 32.143 40.5456 29.7887 38.8443L23.2571 34.1243C22.2083 33.3664 20.7917 33.3664 19.7429 34.1243L13.2113 38.8443C10.857 40.5456 7.70051 38.2422 8.60249 35.4811L11.0801 27.8969C11.4851 26.6571 11.0427 25.2977 9.98552 24.5338L3.51629 19.8588C1.15761 18.1544 2.36334 14.4273 5.27342 14.4273L13.3043 14.4273C14.6022 14.4273 15.7529 13.5926 16.156 12.3589L18.6483 4.72945Z" fill="#E72FD0"/>
      <text x="50%" y="55%" fontWeight="700" fontSize="10" fontFamily="Poppins" fill="white" textAnchor="middle" dominantBaseline="middle">{RankNumber}</text>
    </g>
    <defs>
      <filter id="filter0_d_240_120" x="0.267578" y="0.661011" width="42.4648" height="40.7653" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="1"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_240_120"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_240_120" result="shape"/>
      </filter>
    </defs>
  </svg>

    return (
        <div className="starRank">
            {Star}
        </div>
    )
}