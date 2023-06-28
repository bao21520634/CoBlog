import { StyleSheet } from 'react-native';
import { COLORS, FONT_FAMILY, SIZES } from '../../constants';

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderRadius: SIZES.small,
        borderColor: COLORS.gray,
        marginBottom: SIZES.medium,
    },

    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: SIZES.medium,
        marginTop: SIZES.medium,
    },

    avatar: {
        width: SIZES.xLarge,
        height: SIZES.xLarge,
        borderRadius: SIZES.xLarge / 2,
    },

    username: {
        marginLeft: SIZES.xSmall,
        fontFamily: FONT_FAMILY.regular,
        fontSize: SIZES.medium,
    },

    blogInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: SIZES.medium,
        marginTop: SIZES.xSmall,
    },

    blogTitle: {
        flex: 1,
        fontFamily: FONT_FAMILY.medium,
        fontSize: 18,
    },

    blogImg: {
        width: 64,
        height: 48,
        borderRadius: 2,
        marginHorizontal: SIZES.medium,
    },

    updateDate: {
        marginLeft: SIZES.medium,
        marginTop: SIZES.xSmall,
        marginBottom: SIZES.medium,
        fontFamily: FONT_FAMILY.light,
        fontSize: 14,
    },
});

export default styles;
