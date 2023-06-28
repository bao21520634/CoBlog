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
                d="M11.008 16.948l-.109.11-.12-.11c-5.177-4.697-8.6-7.804-8.6-10.953 0-2.18 1.636-3.815 3.816-3.815 1.678 0 3.313 1.09 3.89 2.572h2.028c.578-1.482 2.212-2.572 3.89-2.572 2.18 0 3.816 1.635 3.816 3.815 0 3.15-3.423 6.256-8.61 10.953zM15.804 0c-1.897 0-3.717.883-4.905 2.267C9.711.883 7.891 0 5.995 0 2.638 0 0 2.627 0 5.995c0 4.109 3.706 7.476 9.319 12.566L10.899 20l1.58-1.439c5.614-5.09 9.32-8.457 9.32-12.566C21.798 2.627 19.16 0 15.803 0z"
                fill={color}
            />
        </Svg>
    );
}

export default SvgComponent;
