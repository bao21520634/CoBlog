import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT_FAMILY, SIZES } from '../../../constants';

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
        height: Dimensions.get('window').height - 56 * 2 + 16,
        marginTop: SIZES.xSmall,
        marginHorizontal: SIZES.medium
    },

    box: {
        marginBottom: SIZES.medium,
    },

    titleText: {
        fontFamily: FONT_FAMILY.medium,
        fontSize: 16,
    },

    titleInput: {
        marginTop: SIZES.xSmall,
        paddingLeft: SIZES.medium,
        height: SIZES.xxLarge,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SIZES.large,
    },

    tagInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    tagCard: {
        marginTop: SIZES.xSmall,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    tagInput: {
        flex: 1,
        paddingLeft: SIZES.medium,
        height: SIZES.xxLarge,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SIZES.large,
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
        paddingLeft: SIZES.small,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    tagName: {
        fontFamily: FONT_FAMILY.regular,
        fontSize: 14,
    },

    removeIcon: {
        marginLeft: 6,
        marginRight: 4,
        height: SIZES.xLarge,
        width: SIZES.xLarge,
        justifyContent: 'center',
        alignItems: 'center',
    },

    addTag: {
        height: SIZES.xxLarge,
        width: SIZES.xxLarge,
        borderRadius: SIZES.xxLarge / 2,
        borderWidth: 1,
        borderColor: COLORS.gray,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: SIZES.xSmall,
    },

    thumbnailBtn: {
        marginTop: SIZES.xSmall,
        height: 160,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SIZES.small,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },

    uploadBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.medium,
        height: SIZES.ultraLarge,
        borderRadius: SIZES.large,
        backgroundColor: COLORS.primary,
    },

    uploadBtnText: {
        color: COLORS.white,
        fontFamily: FONT_FAMILY.medium,
        fontSize: SIZES.medium,
    },

    imageUploaded: {
        height: 158,
        width: '100%',
        borderWidth: 1,
        borderRadius: SIZES.small,
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
