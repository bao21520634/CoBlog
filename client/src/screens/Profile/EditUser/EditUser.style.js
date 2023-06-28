import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT_FAMILY, SIZES } from '../../../constants';

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.lightWhite,
        height: '100%',
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    input: {
        marginTop: SIZES.xSmall,
        paddingHorizontal: SIZES.medium,
        height: SIZES.xxLarge,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SIZES.large,
    },

    inputLarge: {
        textAlignVertical: 'top',
        marginTop: SIZES.xSmall,
        paddingVertical: SIZES.xSmall,
        paddingHorizontal: SIZES.medium,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SIZES.small,
    },

    backBtn: {
        marginLeft: SIZES.medium,
        marginTop: 48,
        width: SIZES.ultraLarge,
        height: SIZES.ultraLarge,
    },

    saveBtn: {
        marginRight: SIZES.medium,
        marginTop: 44,
    },

    saveText: {
        fontFamily: FONT_FAMILY.medium,
        fontSize: 18,
        color: COLORS.primary,
    },

    upload: {
        width: 84,
        marginVertical: SIZES.xLarge,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },

    uploadText: {
        marginTop: SIZES.xSmall,
        fontFamily: FONT_FAMILY.regular,
        fontSize: 16,
        color: COLORS.primary,
    },

    box: {
        marginHorizontal: SIZES.medium,
        marginBottom: SIZES.medium,
    },

    title: {
        fontFamily: FONT_FAMILY.medium,
        fontSize: 16,
    },
});

export default styles;
