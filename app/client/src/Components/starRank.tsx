import React from "react";


export default function StarRank( { RankNumber }) {

    const Star = <svg xmlns="http://www.w3.org/2000/svg" width="41" height="39" viewBox="0 0 41 39" fill="none">
    <g filter="url(#filter0_d_126_263)">
      <path d="M20.5 2L24.8673 15.3688L39 15.3688L27.5664 23.6312L31.9336 37L20.5 28.7376L9.06637 37L13.4336 23.6312L2 15.3688L16.1327 15.3688L20.5 2Z" fill="#E72FD0"/>
      <text x="50%" y="55%" fontWeight="700" fontSize="10" fontFamily="Poppins" fill="white" textAnchor="middle" dominantBaseline="middle">{RankNumber}</text>
    </g>
    <defs>
      <filter id="filter0_d_126_263" x="0" y="0" width="41" height="39" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="1"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_126_263"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_126_263" result="shape"/>
      </filter>
    </defs>
  </svg>

    return (
        <div className="starRank">
            {Star}
        </div>
    )
}