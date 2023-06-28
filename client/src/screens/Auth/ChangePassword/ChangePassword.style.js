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

    textInput: {
        width: '100%',
        height: SIZES.ultraLarge,
        paddingLeft: 16,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SIZES.large,
        fontFamily: FONT_FAMILY.regular,
        fontSize: SIZES.medium,
    },

    input: {
        marginTop: SIZES.medium,
        flexDirection: "row",
        alignItems: "center",
    },

    container: {
        backgroundColor: COLORS.lightWhite,
        padding: SIZES.medium,
        height: '100%',
    },

    title: {
        marginTop: 160,
        alignSelf: 'center',
        fontFamily: FONT_FAMILY.medium,
        fontSize: SIZES.xLarge,
        color: COLORS.black,
    },

    backBtn: {
        marginTop: 48,
        width: SIZES.ultraLarge,
        height: SIZES.ultraLarge,
    },

    eyeIcon: {
        position: "absolute",
        right: SIZES.medium,
        zIndex: 100
    },

    titleBtn: {
        color: COLORS.white,
        fontFamily: FONT_FAMILY.medium,
        fontSize: SIZES.medium,
    },

    failText: {
        marginTop: 4,
        alignSelf: 'flex-end',
        color: 'orange'
    }
});

export default styles;
