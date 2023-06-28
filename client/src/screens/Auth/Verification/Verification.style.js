import { StyleSheet } from 'react-native';

import { COLORS, FONT_FAMILY, SIZES } from '../../../constants';

const styles = StyleSheet.create({
    input: {
        margin: SIZES.small,
        borderRadius: 4,
        borderColor: COLORS.gray,
        borderWidth: 1,
    },

    container: {
        height: '100%',
        padding: SIZES.medium,
        backgroundColor: COLORS.lightWhite,
    },

    titleHead: {
        marginTop: 160,
        textAlign: 'center',
        fontFamily: FONT_FAMILY.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.black,
    },

    description: {
        fontSize: SIZES.medium,
        color: COLORS.black,
        textAlign: 'center',
        marginTop: SIZES.large,
    },

    codeContainer: {
        flexDirection: 'row',
        marginTop: SIZES.medium,
        alignSelf: 'center',
    },

    codeText: {
        fontSize: SIZES.medium,
        color: COLORS.black,
        textAlign: 'center',
        padding: SIZES.xSmall,
    },

    checkBtn: {
        backgroundColor: COLORS.primary,
        marginTop: SIZES.medium,
        height: 48,
        width: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
});

export default styles;
