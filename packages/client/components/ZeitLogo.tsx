import React from 'react';
import IconBase from 'react-icons/lib/IconBase';

export const ZeitLogo: React.FC<React.SVGAttributes<SVGElement>> = props => (
  <IconBase viewBox="0 0 226 200" {...props}>
    <defs>
      <linearGradient
        x1="196.572434%"
        y1="228.815483%"
        x2="50%"
        y2="50%"
        id="l1"
      >
        <stop style={{ stopColor: '#000' }} offset="0%"/>
        <stop style={{ stopColor: '#fff' }} offset="100%"/>
      </linearGradient>
    </defs>
    <g stroke="none" strokeWidth="1" fillRule="evenodd">
      <g transform="translate(-141.000000, -156.000000)" fill="url(#l1)">
        <polygon points="254 156.459299 367 356 141 356 "/>
      </g>
    </g>
  </IconBase>
);
