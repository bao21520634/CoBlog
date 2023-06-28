import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
    const { scale, color } = props;

    return (
        <Svg
            width={10 * scale}
            height={10 * scale}
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M10 5a.417.417 0 01-.417.417H5.417v4.166a.417.417 0 11-.834 0V5.417H.417a.417.417 0 010-.834h4.166V.417a.417.417 0 01.834 0v4.166h4.166A.417.417 0 0110 5z"
                fill={color}
            />
        </Svg>
    );
}

export default SvgComponent;
