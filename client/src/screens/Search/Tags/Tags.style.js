import { StyleSheet } from 'react-native';
import { COLORS, FONT_FAMILY, SIZES } from '../../../constants';

const styles = StyleSheet.create({
    tagContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: SIZES.xSmall,
        borderWidth: 1,
        borderColor: COLORS.gray,
        marginBottom: SIZES.xSmall,
    },

    tagInfo: {
        marginTop: SIZES.xSmall,
        marginLeft: SIZES.medium,
        marginBottom: SIZES.xSmall,
    },

    tagName: {
        fontFamily: FONT_FAMILY.medium,
        fontSize: 18,
    },

    follow: {
        marginTop: SIZES.xSmall,
        fontFamily: FONT_FAMILY.light,
        fontSize: 14,
    },

    followBtn: {
        height: SIZES.xxLarge,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZES.medium,
        borderRadius: SIZES.large,
        backgroundColor: COLORS.primary
    },

    unfollowBtn: {
        height: SIZES.xxLarge,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZES.medium,
        borderWidth: 1,
        borderRadius: SIZES.large,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.white
    },

    followText: {
        fontFamily: FONT_FAMILY.regular,
        fontSize: 15,
        paddingHorizontal: SIZES.small,
        color: COLORS.white,
    },

    unfollowText: {
        fontFamily: FONT_FAMILY.regular,
        fontSize: 15,
        paddingHorizontal: SIZES.small,
        color: COLORS.primary,
    },
});

export default styles;
