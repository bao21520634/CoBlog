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
                d="M8.077 0a8.077 8.077 0 105.141 14.306l5.469 5.47a.769.769 0 101.087-1.09l-5.468-5.468A8.077 8.077 0 008.076 0zM1.538 8.077a6.538 6.538 0 1113.077 0 6.538 6.538 0 01-13.077 0z"
                fill={color}
            />
        </Svg>
    );
}

export default SvgComponent;
