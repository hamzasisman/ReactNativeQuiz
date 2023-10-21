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
    quizContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: units.height / 72,
        paddingHorizontal: units.height / 72,
        borderWidth: units.height / 500,
        borderColor: colors.BORDER_PINK,
        marginBottom: units.height / 36
    },
    title: {
        fontFamily: Fonts.type.bold,
        fontSize: Fonts.size(18),
        color: colors.BLUE,
        textAlign: 'center',
        marginHorizontal: units.width / 10,
        marginTop: units.height / 72,
        marginBottom: units.height / 30
    },
    quizHeaderText: {
        marginBottom: units.height / 48,
        marginHorizontal: units.width / 36,
        fontSize: Fonts.size(14),
        fontFamily: Fonts.type.regular,
        color: colors.BLACK,
        textAlign: 'center'
    },
    reportContainer: {
        display: 'flex',
        gap: 12,
        marginTop: units.height / 72,
        marginBottom: units.height / 48,
    },
    reportContentContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        width: units.width / 1.2,
    },
    reportText: {
        width: units.width / 2.4,
        textAlign: 'left',
        fontFamily: Fonts.type.bold,
        paddingLeft: 4,
    },
    reportValue: {
        width: units.width / 2,
        textAlign: 'right',
        paddingRight: 4,
    },
    closeContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 4,
    },
    button: {
        marginVertical: units.height / 40,
    },
});