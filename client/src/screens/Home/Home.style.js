import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT_FAMILY, SIZES } from '../../constants';

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height - 56 * 2,
    },

    tagList: {
        marginTop: SIZES.small,
        height: SIZES.xxLarge,
    },

    addTag: {
        marginLeft: SIZES.medium,
        height: SIZES.xxLarge,
        width: SIZES.xxLarge,
        borderWidth: 1,
        borderRadius: SIZES.xxLarge / 2,
        borderColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    blogList: {
        marginTop: SIZES.xLarge,
        marginBottom: SIZES.medium + SIZES.small,
        marginHorizontal: SIZES.medium,
    },
});

export default styles;
