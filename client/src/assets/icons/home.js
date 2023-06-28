import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
    const { scale, color } = props;
    return (
        <Svg
            width={19 * scale}
            height={20 * scale}
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M1.739 18.258h4.593v-6.956h6.086v6.956h4.347V6.955L9.274 1.74 1.739 6.955v11.303zm.68 1.739c-.637 0-1.284.062-1.739-.392-.454-.455-.68-1-.68-1.637V7.535c0-.367.082-.715.247-1.043.165-.329.391-.6.68-.812L7.883.464c.212-.155.434-.27.666-.348C8.781.039 9.023 0 9.274 0s.492.039.724.116c.232.077.454.193.667.348L17.62 5.68c.29.213.517.483.682.812.165.328.246.676.246 1.043v10.433c0 .638-.228 1.184-.682 1.638-.454.454-.9.391-1.536.39h-5.897v-6.665H8.115v6.666H2.419z"
                fill={color}
            />
        </Svg>
    );
}

export default SvgComponent;
