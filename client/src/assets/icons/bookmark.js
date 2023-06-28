import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
    const { scale, color } = props;
    return (
        <Svg
            width={17 * scale}
            height={20 * scale}
            viewBox="0 0 17 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M5.455 0h9.09a1.818 1.818 0 011.819 1.818v14.546l-1.819-.791V1.818H3.636A1.818 1.818 0 015.455 0zm5.454 17.273V5.455H1.82v11.818l4.545-1.982 4.545 1.982zm0-13.637a1.818 1.818 0 011.818 1.819V20l-6.363-2.727L0 20V5.455a1.818 1.818 0 011.818-1.819h9.091z"
                fill={color}
            />
        </Svg>
    );
}

export default SvgComponent;
