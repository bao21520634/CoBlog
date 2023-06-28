import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT_FAMILY, SIZES } from '../../constants';

const styles = StyleSheet.create({
    header: {
        height: 90,
        backgroundColor: COLORS.white,
    },

    headerWithoutStatusBar: {
        marginTop: 47,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerTitle: {
        fontFamily: FONT_FAMILY.medium,
        fontSize: SIZES.large,
        marginLeft: SIZES.medium,
    },

    headerConfirmBtn: {
        width: 60,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },

    nextText: {
        fontFamily: FONT_FAMILY.regular,
        fontSize: SIZES.medium,
        color: COLORS.primary,
    },

    backBtn: {
        width: 60,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },

    saveBtn: {
        width: 60,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },

    saveText: {
        fontFamily: FONT_FAMILY.regular,
        fontSize: SIZES.medium,
        color: COLORS.primary,
    },

    container: {
        height: Dimensions.get('window').height - 56 * 2,
        marginTop: SIZES.xSmall,
        marginHorizontal: SIZES.medium,
    },

    richTextContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 4,
    },

    richTextEditor: {
        fontSize: SIZES.medium,
    },

    richTextToolbar: {
        borderBottomWidth: 1,
        borderColor: COLORS.gray,
        backgroundColor: COLORS.white,
    },
});

export default styles;
