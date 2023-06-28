import { StyleSheet } from 'react-native';
import { COLORS, FONT_FAMILY, SIZES } from '../../constants';

const styles = StyleSheet.create({
    tag: {
        marginLeft: 4,
        height: SIZES.xxLarge,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderRadius: SIZES.large,
        borderColor: COLORS.gray,
        paddingHorizontal: SIZES.small,
        alignItems: 'center',
        justifyContent: 'center',
    },

    tagActivated: {
        marginLeft: 4,
        height: SIZES.xxLarge,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.large,
        paddingHorizontal: SIZES.small,
        alignItems: 'center',
        justifyContent: 'center',
    },

    tagName: {
        fontFamily: FONT_FAMILY.regular,
        fontSize: 14,
        color: COLORS.black,
    },

    tagNameActivated: {
        fontFamily: FONT_FAMILY.medium,
        fontSize: 14,
        color: COLORS.white,
    },
});

export default styles;
