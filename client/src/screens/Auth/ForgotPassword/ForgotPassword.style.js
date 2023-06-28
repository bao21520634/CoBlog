import { StyleSheet } from 'react-native';

import { COLORS, FONT_FAMILY, SIZES } from '../../../constants';

const styles = StyleSheet.create({
    button: {
        marginTop: SIZES.medium,
        height: SIZES.ultraLarge,
        borderRadius: SIZES.large,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
    },

    input: {
        height: SIZES.ultraLarge,
        paddingLeft: SIZES.medium,
        marginTop: SIZES.medium,
        justifyContent: 'center',
        borderRadius: SIZES.large,
        borderWidth: 1,
        borderColor: COLORS.gray,
        backgroundColor: COLORS.white,
    },

    container: {
        backgroundColor: COLORS.lightWhite,
        padding: SIZES.medium,
        height: '100%',
    },

    title: {
        marginTop: 64,
        alignSelf: 'center',
        fontFamily: FONT_FAMILY.medium,
        fontSize: SIZES.xLarge,
        color: COLORS.black,
    },

    description: {
        marginTop: SIZES.medium,
        alignSelf: 'center',
        fontFamily: FONT_FAMILY.regular,
        fontSize: SIZES.large,
        color: COLORS.black,
    },

    backBtn: {
        marginTop: 48,
        width: SIZES.ultraLarge,
        height: SIZES.ultraLarge,
    },

    titleBtn: {
        color: COLORS.white,
        fontFamily: FONT_FAMILY.medium,
        fontSize: SIZES.medium,
    },
});

export default styles;
