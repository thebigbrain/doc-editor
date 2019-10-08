import React from 'react';

interface ISadboxProps extends React.HTMLAttributes<SVGElement> {
  scale?: number;
  width?: number;
  height?: number;
}

export const Sadbox: React.FC<ISadboxProps> = ({
                                                 scale = 1,
                                                 width = 64,
                                                 height = 64,
                                                 ...props
                                               }) => (
  <svg
    width={width * scale}
    height={height * scale}
    viewBox="0 0 58 58"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path d="m48 0h-38l-10 16v42h58v-42z" fill="#a98258"/>
      <path d="m10 0-10 16h58l-10-16z" fill="#daae86"/>
      <path d="m33 54-4-4-4 4-2-2v6h12v-6z" fill="#d8b18b"/>
      <path d="m23 0h12v16h-12z" fill="#f4d5bd"/>
      <path d="m25 21 4 4 4-4 2 2v-7h-12v7z" fill="#d8b18b"/>
      <g fill="#000" transform="translate(4 24)">
        <path
          d="m17.8181818 14.736842c.000495.8458946.1974848 1.6687015.5320707 2.4310874.5043535 1.1430876 1.3170604 2.1638595 2.3648684 2.9306664 1.0453333.7628771 2.3515048 1.2698245 3.7848784 1.2698245.9532727.0004912 1.8565554-.2254737 2.6573836-.6017544 1.2027272-.5663859 2.1847069-1.4569823 2.8875351-2.5013331.6993636-1.0453332 1.1334342-2.2586664 1.1368989-3.5284908 0-.8139649-.6647171-1.4736841-1.4848484-1.4736841-.8201312 0-1.4848483.6597192-1.4848483 1.4736841.0004949.3826666-.0935455.8183858-.2845959 1.2531226-.284596.6533333-.7899394 1.2899648-1.400707 1.7325613-.6137373.446035-1.3076564.6985262-2.026818.6985262-.4815858 0-.9458484-.112-1.3883332-.3192982-.6627373-.308-1.2675655-.8454034-1.6853028-1.4707367-.4216969-.6233683-.6419495-1.3214034-.6384848-1.8941752 0-.8139649-.6647171-1.4736841-1.4848483-1.4736841-.8201313 0-1.4848484.6597192-1.4848484 1.4736841"
          transform="matrix(1 0 0 -1 0 34.631578)"
        />
        <g opacity=".2">
          <ellipse cx="2.227273" cy="11.789473" rx="2.227273" ry="2.210526"/>
          <ellipse cx="46.772727" cy="11.789473" rx="2.227273" ry="2.210526"/>
        </g>
        <ellipse cx="5.568182" cy="3.315789" rx="3.340909" ry="3.315789"/>
        <ellipse cx="44.174243" cy="3.315789" rx="3.340909" ry="3.315789"/>
      </g>
    </g>
  </svg>
);
