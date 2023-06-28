import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    const { scale, color } = props;

    return (
        <Svg
            width={31 * scale}
            height={20 * scale}
            viewBox="0 0 31 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M30.19 9.688c-.044-.1-1.11-2.465-3.493-4.847C24.487 2.633 20.69 0 15.128 0 9.566 0 5.769 2.633 3.558 4.841 1.178 7.223.11 9.585.067 9.688a.77.77 0 000 .626c.044.099 1.11 2.464 3.493 4.846C5.769 17.368 9.566 20 15.128 20c5.562 0 9.359-2.632 11.57-4.84 2.381-2.382 3.448-4.743 3.492-4.846a.77.77 0 000-.626zm-15.062 8.774c-4.023 0-7.536-1.465-10.442-4.35A17.278 17.278 0 011.626 10c.81-1.515 1.841-2.9 3.06-4.11 2.906-2.887 6.419-4.352 10.442-4.352 4.023 0 7.536 1.465 10.442 4.352A17.251 17.251 0 0128.63 10c-.817 1.565-4.912 8.462-13.502 8.462zm0-14.36A5.897 5.897 0 1021.026 10a5.906 5.906 0 00-5.898-5.897zm0 10.257a4.36 4.36 0 110-8.719 4.36 4.36 0 010 8.719z"
                fill={color}
            />
        </Svg>
    )
}

export default SvgComponent