import React from 'react';

interface HeaderLogoProps {
  accentColor: string;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ accentColor }) => {
  return (
    <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx="100" cy="100" r="98" fill="none" stroke={accentColor} strokeWidth="4" />
        <defs>
          <path id="logoCirclePathTop" d="M 30, 100 a 70,70 0 1,1 140,0" />
          <path id="logoCirclePathBottom" d="M 30, 100 a 70,70 0 0,0 140,0" />
        </defs>
        <text fill={accentColor} fontSize="13" fontWeight="bold" letterSpacing="0.5">
          <textPath href="#logoCirclePathTop" startOffset="50%" textAnchor="middle">
            BALAKA INTERNATIONAL TRAVELS
          </textPath>
        </text>
        <text fill={accentColor} fontSize="13" fontWeight="bold" letterSpacing="0.5">
          <textPath href="#logoCirclePathBottom" startOffset="50%" textAnchor="middle">
            • CARGO •
          </textPath>
        </text>
        <g transform="translate(100, 100)">
           <path d="M-35,15 L35,15 L40,0 L35,-15 L-35,-15 L-40,0 Z" fill={accentColor} />
            <text x="0" y="3" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="24" fontWeight="bold">
                বলাকা
            </text>
        </g>
      </svg>
    </div>
  );
}

export default HeaderLogo;
