import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
    const { scale, color } = props;
    return (
        <Svg
            width={5 * scale}
            height={20 * scale}
            viewBox="0 0 5 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M0 10a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0zm0-7.5a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0zm0 15a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0z"
                fill={color}
            />
        </Svg>
    );
}

export default SvgComponent;
