import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
    const { scale, color } = props;

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={16 * scale}
            height={12 * scale}
            viewBox="0 0 16 12"
            fill="none"
            {...props}
        >
            <Path
                fill={color}
                d="M14.71 1.21a1 1 0 00-1.42 0L5.84 8.67 2.71 5.53A1.022 1.022 0 101.29 7l3.84 3.84a1.001 1.001 0 001.42 0l8.16-8.16a1 1 0 000-1.47z"
            />
        </Svg>
    );
}

export default SvgComponent;
