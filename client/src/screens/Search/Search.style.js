import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT_FAMILY, SIZES } from '../../constants';

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height - 56 * 2 - 8,
    },

    searchbarContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.medium,
    },

    line: {
        marginHorizontal: SIZES.medium,
        borderBottomWidth: 1,
        borderColor: COLORS.gray
    },

    searchInput: {
        flex: 1,
        height: SIZES.xxLarge,
        width: '100%',
    },

    searchBtn: {
        height: 28,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 16
    },

    horizontalScrollContainer: {
        marginTop: SIZES.small,
        marginLeft: SIZES.medium,
        height: SIZES.xxLarge,
    },

    list: {
        marginTop: SIZES.xLarge,
        marginBottom: SIZES.medium + SIZES.small + SIZES.xxLarge,
        marginHorizontal: SIZES.medium,
    },
});

export default styles;
