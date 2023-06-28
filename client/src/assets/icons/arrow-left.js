import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
    const { scale, color } = props;

    return (
        <Svg
            width={20 * scale}
            height={16 * scale}
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M19.375 8a1.125 1.125 0 01-1.125 1.125H4.469l4.83 4.83a1.127 1.127 0 11-1.594 1.593l-6.75-6.75a1.125 1.125 0 010-1.594l6.75-6.75a1.127 1.127 0 011.594 1.594l-4.83 4.827h13.78A1.125 1.125 0 0119.376 8z"
                fill={color}
            />
        </Svg>
    );
}

export default SvgComponent;
