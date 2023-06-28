import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
    const { scale, color } = props;
    return (
        <Svg
            width={16 * scale}
            height={20 * scale}
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M0 20V2.222c0-.61.218-1.134.653-1.57A2.136 2.136 0 012.223 0h11.11a2.14 2.14 0 011.57.653c.436.436.653.959.653 1.57V20l-7.778-3.333L0 20z"
                fill={color}
            />
        </Svg>
    );
}

export default SvgComponent;
