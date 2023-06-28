import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
    const { scale, color } = props;
    return (
        <Svg
            width={22 * scale}
            height={20 * scale}
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M10.9 20l-1.581-1.439C3.706 13.471 0 10.104 0 5.995 0 2.627 2.638 0 5.995 0 7.89 0 9.71.883 10.899 2.267 12.087.883 13.907 0 15.804 0c3.357 0 5.994 2.627 5.994 5.995 0 4.109-3.705 7.476-9.318 12.566L10.9 20z"
                fill={color}
            />
        </Svg>
    );
}

export default SvgComponent;
