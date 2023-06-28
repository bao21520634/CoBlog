import * as React from "react"
import Svg, { Path } from "react-native-svg"

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
                d="M19.707 18.292a.999.999 0 01-.325 1.632 1 1 0 01-1.09-.217L10 11.414l-8.292 8.293a1 1 0 01-1.415-1.415L8.586 10 .293 1.708A1 1 0 111.708.293L10 8.586 18.292.293a1 1 0 011.415 1.415L11.414 10l8.293 8.292z"
                fill={color}
            />
        </Svg>
    )
}

export default SvgComponent
