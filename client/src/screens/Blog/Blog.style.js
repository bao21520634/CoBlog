import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT_FAMILY, SIZES } from '../../constants';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: SIZES.medium
    },

    header: {
        marginTop: 48,
        marginBottom: SIZES.xLarge,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    statusIconList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    statusIcon: {
        marginLeft: SIZES.small,
        width: SIZES.xLarge,
        height: SIZES.xLarge,
        justifyContent: 'center',
        alignItems: 'center'
    },

    line: {
        marginTop: SIZES.medium,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    backBtn: {
        width: SIZES.xLarge,
        height: SIZES.xLarge,
        justifyContent: 'center',
        alignItems: 'center'
    },

    blogContent: {
        marginBottom: 160,
    },

    blogTitle: {
        fontFamily: FONT_FAMILY.medium,
        fontSize: 24,
        color: COLORS.black,
        marginBottom: SIZES.medium,
    },

    blogInfoTitle: {
        fontFamily: FONT_FAMILY.medium,
        fontSize: 16,
        color: COLORS.black,
        marginTop: SIZES.xLarge,
        marginBottom: SIZES.xSmall,
    },

    tagNameList: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: SIZES.xSmall,
    },

    tag: {
        marginRight: SIZES.xSmall,
        marginBottom: SIZES.xSmall,
        height: SIZES.xxLarge,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderRadius: SIZES.large,
        borderColor: COLORS.gray,
        paddingHorizontal: SIZES.small,
        alignItems: 'center',
        justifyContent: 'center',
    },

    tagName: {
        fontFamily: FONT_FAMILY.regular,
        fontSize: 14,
    },

    firstUserCard: {
        marginBottom: SIZES.xxLarge,
        marginTop: SIZES.medium,
        alignSelf: 'flex-start',
    },

    userInfoCard: {
        marginTop: SIZES.xSmall,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
    },

    username: {
        marginLeft: SIZES.xSmall,
        fontFamily: FONT_FAMILY.regular,
        fontSize: SIZES.medium,
    },

    statusInfoCard: {
        marginTop: SIZES.xLarge,
        marginBottom: SIZES.xSmall,
        display: 'flex',
        flexDirection: 'row',
    },

    statusInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    statusInfoTitle: {
        fontFamily: FONT_FAMILY.medium,
        fontSize: 16,
        color: COLORS.black
    },

    statusInfoNumber: {
        fontFamily: FONT_FAMILY.regular,
        fontSize: 16,
        color: COLORS.black
    },

    followNumberText: {
        marginTop: 2,
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

    createdAtContainer: {
        display: 'flex',
        flexDirection: 'row'
    },

    createdAt: {
        fontFamily: FONT_FAMILY.regular,
        fontSize: 16,
        marginTop: SIZES.xLarge,
        marginBottom: SIZES.xSmall,
        marginLeft: SIZES.xSmall
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
