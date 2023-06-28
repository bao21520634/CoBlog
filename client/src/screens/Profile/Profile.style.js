import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT_FAMILY, SIZES } from '../../constants';

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height - 56 * 2,
    },

    header: {
        marginTop: 48,
        marginBottom: SIZES.medium,
        marginHorizontal: SIZES.medium,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    horizontalScrollContainer: {
        marginTop: SIZES.xLarge,
        marginLeft: SIZES.medium,
        height: SIZES.xxLarge,
    },

    backBtn: {
        width: SIZES.xLarge,
        height: SIZES.xLarge,
        justifyContent: 'center',
        alignItems: 'center'
    },

    icon: {
        marginLeft: SIZES.small,
        width: SIZES.xLarge,
        height: SIZES.xLarge,
        justifyContent: 'center',
        alignItems: 'center'
    },

    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },

    user: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: SIZES.small,
        marginHorizontal: SIZES.medium,
    },

    userFullInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    userInfo: {
        marginLeft: SIZES.xSmall,
    },

    username: {
        marginLeft: SIZES.xSmall,
        fontFamily: FONT_FAMILY.regular,
        fontSize: SIZES.medium,
    },

    filterText: {
        fontFamily: FONT_FAMILY.medium,
        fontSize: 16,
        color: COLORS.black,
        alignSelf: 'center',
        marginTop: SIZES.medium,
    },

    list: {
        marginTop: SIZES.xLarge,
        marginBottom: SIZES.xxLarge + SIZES.xxLarge + SIZES.medium,
        marginHorizontal: SIZES.medium,
    },

    editIcon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    followerNumber: {
        marginTop: 6,
        marginLeft: SIZES.xSmall,
        fontFamily: FONT_FAMILY.regular,
        fontSize: 14,
    },

    followingText: {
        marginLeft: SIZES.small,
        fontFamily: FONT_FAMILY.regular,
        fontSize: 14,
        color: COLORS.primary
    },

    followBtn: {
        height: SIZES.xxLarge,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.large,
        paddingHorizontal: SIZES.small,
        alignItems: 'center',
        justifyContent: 'center',
    },

    unfollowBtn: {
        height: SIZES.xxLarge,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderRadius: SIZES.large,
        borderColor: COLORS.primary,
        paddingHorizontal: SIZES.small,
        alignItems: 'center',
        justifyContent: 'center',
    },

    followText: {
        fontFamily: FONT_FAMILY.regular,
        fontSize: 14,
        color: COLORS.white
    },

    unfollowText: {
        fontFamily: FONT_FAMILY.regular,
        fontSize: 14,
        color: COLORS.primary,
    },

    userInfoTitle: {
        fontFamily: FONT_FAMILY.medium,
        fontSize: 16,
        color: COLORS.black,
        marginBottom: SIZES.xSmall,
    },

    userInfoText: {
        fontFamily: FONT_FAMILY.regular,
        fontSize: 16,
        color: COLORS.black,
        marginBottom: SIZES.medium,
    },

    dropdownList: {
        height: SIZES.xLarge,
        width: SIZES.xLarge,
        marginLeft: SIZES.xSmall
    },

    dropdown: {
        height: 24,
        width: 24,
        position: 'absolute',
        zIndex: 100
    },

    dropdownBox: {
        width: 160,
        left: Dimensions.get('window').width - 160 - 16,
        top: SIZES.xSmall,
        borderRadius: SIZES.xSmall
    },

    dropdownIcon: {
        height: 24,
        width: 24,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;
