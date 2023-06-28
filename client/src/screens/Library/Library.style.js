import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT_FAMILY, SIZES } from '../../constants';

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height - 56 * 2,
    },

    horizontalScrollContainer: {
        marginTop: SIZES.small,
        marginLeft: SIZES.medium,
        height: SIZES.xxLarge,
    },

    list: {
        marginTop: SIZES.xLarge,
        marginBottom: SIZES.medium + SIZES.small,
        marginHorizontal: SIZES.medium,
    },
});

export default styles;
