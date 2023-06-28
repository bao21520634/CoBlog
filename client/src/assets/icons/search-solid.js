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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.326 12.899l5.38 5.38a1.009 1.009 0 01-1.427 1.426l-5.38-5.38a8 8 0 111.426-1.426zM8 13.999A6 6 0 108 2a6 6 0 000 12z"
                fill={color}
            />
        </Svg>
    );
}

export default SvgComponent;
