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
                d="M0 16.667h8.333v1.666H0v-1.666zm0-5h8.333v1.666H0v-1.666zm18.333-3.334H1.667A1.667 1.667 0 010 6.667v-5A1.667 1.667 0 011.667 0h16.666A1.666 1.666 0 0120 1.667v5a1.667 1.667 0 01-1.667 1.666zM1.667 1.667v5h16.666v-5H1.667zM18.333 20h-5a1.667 1.667 0 01-1.666-1.667v-5a1.667 1.667 0 011.666-1.666h5A1.667 1.667 0 0120 13.333v5A1.666 1.666 0 0118.333 20zm-5-6.667v5h5v-5h-5z"
                fill={color}
            />
        </Svg>
    );
}

export default SvgComponent;
