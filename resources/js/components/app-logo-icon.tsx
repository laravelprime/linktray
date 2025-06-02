import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="none">
            <rect width="120" height="120" rx="24" fill="#4F46E5"/>
            <g transform="translate(24 20)">
                <circle cx="10" cy="10" r="8" stroke="#FFFFFF" strokeWidth="3"/>
                <rect x="28" y="7" width="40" height="6" rx="3" fill="#FFFFFF"/>

                <circle cx="10" cy="40" r="8" stroke="#FFFFFF" strokeWidth="3"/>
                <rect x="28" y="37" width="40" height="6" rx="3" fill="#FFFFFF"/>

                <circle cx="10" cy="70" r="8" stroke="#FFFFFF" strokeWidth="3"/>
                <rect x="28" y="67" width="40" height="6" rx="3" fill="#FFFFFF"/>
            </g>
        </svg>

    );
}
