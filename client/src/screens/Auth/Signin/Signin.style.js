import { StyleSheet } from 'react-native';
import { COLORS, FONT_FAMILY, SIZES } from '../../../constants';

const styles = StyleSheet.create({
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

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.medium,
        height: SIZES.ultraLarge,
        width: '100%',
        borderRadius: SIZES.large,
    },

    container: {
        height: '100%',
        padding: SIZES.medium,
        backgroundColor: COLORS.lightWhite,
    },

    image: {
        marginTop: 120,
        alignSelf: 'center',
        width: 100,
        height: 74.2,
    },

    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: SIZES.medium,
    },

    forgotPasswordText: {
        color: COLORS.primary,
        fontFamily: FONT_FAMILY.regular,
        fontSize: SIZES.medium,
    },

    eyeIcon: {
        position: "absolute",
        right: SIZES.medium,
        zIndex: 100
    },

    signinBtn: {
        backgroundColor: COLORS.primary,
    },

    signinText: {
        color: COLORS.white,
        fontFamily: FONT_FAMILY.medium,
        fontSize: SIZES.medium,
    },

    signupBtn: {
        borderWidth: 1,
        borderColor: COLORS.primary,
    },

    signupText: {
        color: COLORS.primary,
        fontFamily: FONT_FAMILY.regular,
        fontSize: SIZES.medium,
    },

    failText: {
        marginTop: 4,
        alignSelf: 'flex-end',
        color: 'orange'
    }
});

export default styles;
