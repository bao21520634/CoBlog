import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    const { scale, color } = props;
    return (
        <Svg
            width={28 * scale}
            height={20 * scale}
            viewBox="0 0 28 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M19 10a5 5 0 01-5 5m-5-5a5 5 0 015-5m-3 13.654c.984.228 1.99.344 3 .346 7.18 0 13-6 13-9 0-1.336-1.155-3.268-3.071-5M17.5 1.47A13.49 13.49 0 0014 1C6.82 1 1 7 1 10c0 1.32 1.127 3.22 3 4.935M5 19L23 1"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default SvgComponent
