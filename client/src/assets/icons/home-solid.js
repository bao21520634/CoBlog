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
                d="M2.619 20a2.202 2.202 0 01-1.615-.672 2.197 2.197 0 01-.67-1.614V7.43c0-.362.08-.705.243-1.029.162-.324.386-.59.67-.8L8.106.457c.21-.152.428-.267.657-.343C8.99.038 9.229 0 9.476 0c.248 0 .486.038.714.114.229.076.448.19.658.343L17.705 5.6c.286.21.51.476.672.8.162.324.243.667.242 1.029v10.285c0 .629-.224 1.167-.672 1.615a2.196 2.196 0 01-1.614.671H10.62v-6.857H8.333V20H2.62z"
                fill={color}
            />
        </Svg>
    );
}

export default SvgComponent;
