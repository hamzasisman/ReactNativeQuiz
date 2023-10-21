import { StyleSheet } from 'react-native';
import { colors } from '../../../../../../theme/Colors';
import Fonts from '../../../../../../theme/Fonts';
import { units } from '../../../../../../theme/Units';

export default StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.SOFT_ORANGE,
        borderRadius: units.height / 72,
        marginBottom: units.height / 48,
        width: units.width / 1.09,
        flexDirection: 'row-reverse',
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        marginVertical: units.height / 48,
        fontFamily: Fonts.type.bold,
        color: colors.BLACK,
        textAlign: 'center'
    },
    remainingTime: {
        fontFamily: Fonts.type.bold,
        color: colors.BLUE,
    }
});