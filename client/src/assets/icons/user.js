import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
    const { scale, color } = props;
    return (
        <Svg
            width={20 * scale}
            height={20 * scale}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M10 1a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M3.044 15.711S5.05 13.15 10 13.15c4.95 0 6.957 2.561 6.957 2.561M10 10a2.7 2.7 0 100-5.4 2.7 2.7 0 000 5.4z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default SvgComponent;
