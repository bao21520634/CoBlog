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
                d="M15.556 5.556l-1.567 1.566 1.755 1.767H6.667v2.222h9.077l-1.755 1.756 1.567 1.577L20 10l-4.444-4.444zM2.222 2.222H10V0H2.222C1 0 0 1 0 2.222v15.556C0 19 1 20 2.222 20H10v-2.222H2.222V2.222z"
                fill={color}
            />
        </Svg>
    )
}

export default SvgComponent
