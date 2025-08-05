import React from 'react';
import { WatermarkState } from '../types';

const Watermark: React.FC<{ watermarkState: WatermarkState }> = ({ watermarkState }) => {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-3/4 h-3/4 text-gray-200 opacity-70"
      >
        <style>
          {`
            .watermark-text {
              fill: currentColor;
            }
            .watermark-shape {
              fill: currentColor;
            }
            .watermark-shape-text {
              fill: white;
            }
          `}
        </style>
        <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" strokeWidth="4" />
        <defs>
          <path id="watermarkCirclePathTop" d="M 30, 100 a 70,70 0 1,1 140,0" />
          <path id="watermarkCirclePathBottom" d="M 30, 100 a 70,70 0 0,0 140,0" />
        </defs>
        <text className="watermark-text" fontSize="13" fontWeight="bold" letterSpacing="0.5">
          <textPath href="#watermarkCirclePathTop" startOffset="50%" textAnchor="middle">
            {watermarkState.topArcText.toUpperCase()}
          </textPath>
        </text>
        <text className="watermark-text" fontSize="13" fontWeight="bold" letterSpacing="0.5">
          <textPath href="#watermarkCirclePathBottom" startOffset="50%" textAnchor="middle">
            {watermarkState.bottomArcText.toUpperCase()}
          </textPath>
        </text>
        <g transform="translate(100, 100)">
           <path d="M-35,15 L35,15 L40,0 L35,-15 L-35,-15 L-40,0 Z" className="watermark-shape" />
            <text x="0" y="3" textAnchor="middle" dominantBaseline="middle" className="watermark-shape-text" fontSize="24" fontWeight="bold">
                {watermarkState.centralText}
            </text>
        </g>
      </svg>
    </div>
  );
};

export default Watermark;