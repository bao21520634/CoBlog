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
                d="M10 0C4.579 0 0 4.579 0 10s4.579 10 10 10 10-4.579 10-10S15.421 0 10 0zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zM2.894 15.772c.897-1.32 4.393-3.2 6.106-3.2h2c1.714 0 5.209 1.88 6.106 3.2C15.828 17.14 12.015 17 10 17c-2.015 0-5.828.14-7.106-1.228z"
                fill={color}
            />
        </Svg>
    );
}

export default SvgComponent;
